import { Component, OnInit } from '@angular/core';
import {timer} from 'rxjs';
import {SessionService} from '../../service/session.service';
import {MoyenDeTransport} from '../../model/moyenDeTransport';
import * as L from 'leaflet';
import {ClientService} from '../../service/client.service';
import { Client } from 'src/app/model/client';
import {Reservation} from '../../model/Reservation';
import {Itineraire} from '../../model/itineraire';
import {ItineraireService} from '../../service/itineraire.service';
import {Router} from "@angular/router";
import {PaiementFournisseur} from '../../model/paiementFournisseur';
import {PaiementFournisseurService} from '../../service/paiement-fournisseur.service';
import {ReservationService} from '../../service/reservation.service';
import {Fournisseur} from '../../model/fournisseur';
import {MoyenDeTransportService} from "../../service/moyen-de-transport.service";

@Component({
  selector: 'app-fin-de-trajet',
  templateUrl: './fin-de-trajet.component.html',
  styleUrls: ['./fin-de-trajet.component.scss']
})
export class FinDeTrajetComponent implements OnInit {

  public prixSeconde;
  public time: number = 0;
  public cout;
  public timerDisplay = {
    minutes: {digit1: "0", digit2: "0"},
    seconds: {digit1: "0", digit2: "0"}
  };
  public client: Client = new Client();
  public reservation: Reservation = new Reservation();
  public moyenDeTransportChoisi = new MoyenDeTransport();
  public itineraire = new Itineraire();

  public validationDuMoyenDeTransport : boolean;
  public qrCodeInput : string;
  public paiementFournisseur = new PaiementFournisseur();
  private ancientSolde: number;

  map;
  ligne;

  // On récupère les icônes des moyens de transport
  veloIcon = new L.Icon({ iconUrl: '../../../assets/icon-velo.png' , iconAnchor:   [10, 5]});
  scootIcon = new L.Icon({ iconUrl: '../../../assets/icon-scoot.png' , iconAnchor:   [10, 5]});
  trotIcon = new L.Icon({ iconUrl: '../../../assets/icon-trot.png' , iconAnchor:   [15, 20]});
  hommeIcon = new L.Icon({ iconUrl: '../../../assets/icon-homme.png' , iconAnchor:   [32, 60]});


  ngOnInit(): void {
  }

  constructor(private reservationService: ReservationService, private router: Router, private sessionService: SessionService, private itineraireService: ItineraireService, private paiementFournisseurService: PaiementFournisseurService, private clientService: ClientService, private moyenDeTransportService: MoyenDeTransportService) {
    this.moyenDeTransportChoisi = this.sessionService.getMoyenDeTransportReserve();
    this.reservation = this.sessionService.getReservation();
    this.client=sessionService.getClient();
  }

  getDisplayTimer(time: number) {
    // const hours = '0' + Math.floor(time / 3600);
    const minutes = '0' + Math.floor(time % 3600 / 60);
    const seconds = '0' + Math.floor(time % 3600 % 60);

    return {
      // hours: { digit1: hours.slice(-2, -1), digit2: hours.slice(-1) },
      minutes: {digit1: minutes.slice(-2, -1), digit2: minutes.slice(-1)},
      seconds: {digit1: seconds.slice(-2, -1), digit2: seconds.slice(-1)},
    };
  }

  finDuTrajet(){
    //Modifier la réservation puis envoie la MAJ au serveur
    this.reservation.expiree = true;
    this.reservation.dureeTotale = this.time;
    // @ts-ignore
    this.reservation.heureArrivee = new Date();
    this.reservation.montantTotal = this.cout;

    this.reservationService.modify(this.reservation).subscribe( resp => {
    }, error => console.log(error));

    //Modifier l'itinéraire puis envoie la MAJ en base
    this.itineraire=this.sessionService.getItineraire();
    this.itineraire.montant=this.cout;
    this.itineraire.duree=this.time;
    this.itineraire.moyenDeTransport=this.moyenDeTransportChoisi;
    this.sessionService.setItineraire(this.itineraire);

    // creer paiement fournisseur et l'associer à l'itinéraire
    // @ts-ignore
    this.paiementFournisseur.date = new Date();
    this.paiementFournisseur.montant = this.cout;
    this.paiementFournisseur.numeroDeTransaction = "TRANS-" + this.itineraire.id;
    this.paiementFournisseur.itineraire = this.itineraire;
    this.paiementFournisseur.fournisseur = this.moyenDeTransportChoisi.fournisseur;

    this.paiementFournisseurService.create(this.paiementFournisseur).subscribe(resp => {
    }, error => console.log(error));

    // retirer au solde le prix du trajet

    this.ancientSolde = this.client.solde;
    this.client.solde = this.ancientSolde - this.cout;

    this.clientService.modify(this.client).subscribe(resp => {
      this.sessionService.setUtilisateur(this.client);
    }, error => console.log(error));


    //Supprime le moyen de transport de l'itinéraire car lien OneOne entre eux et stock en base
    // this.itineraire.moyenDeTransport = null;
    this.itineraireService.modify(this.itineraire).subscribe(resp => {
    }, error => console.log(error));
    this.router.navigateByUrl('/finalisation');
  }

  validationDuQrCode(qrCodeRenseigne : string){
    if(qrCodeRenseigne==this.moyenDeTransportChoisi.qrCode){
      this.validationDuMoyenDeTransport=true;
      //On lance le timer et le compteur de prix
      this.prixSeconde = this.moyenDeTransportChoisi.prixMinute / 60;
      timer(0, 1000).subscribe(ellapsedCycles => {
        this.time++;
        this.timerDisplay = this.getDisplayTimer(this.time);
        this.cout = (this.prixSeconde * this.time).toFixed(2);
        this.createMap();
        this.addMarker();
      });
    }
    else {
      console.log("C'est pas le bon qrCode");
    }

  }

  createMap(){
    const centre = {
      lat: this.sessionService.getClient().latitude,
      lng: this.sessionService.getClient().longitude,
    };

    const zoomLevel = 14;
    var container = L.DomUtil.get('map');
    if (container.style.position.valueOf() == "") {
      this.map = L.map('map', {center: [centre.lat, centre.lng], zoom: zoomLevel});
    }


    const mainLayer = L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> contributors',
      minZoom: 2,
      maxZoom: 19
    });

    if (this.map != undefined) {
      mainLayer.addTo(this.map);
      if(this.sessionService.getClient().type=="customer"){
        L.marker([centre.lat, centre.lng], {icon: this.hommeIcon}).addTo(this.map);
      }
    }

  }

  addMarker(){

    if (this.moyenDeTransportChoisi.typeDeTransport == "velo") {
      const marker = L.marker([this.moyenDeTransportChoisi.latitude, this.moyenDeTransportChoisi.longitude], {icon: this.veloIcon});
      marker.addTo(this.map);
      marker.bindPopup('<h6>Velo n°</h6>' + this.moyenDeTransportChoisi.numeroDeSerie);
    }
    else if (this.moyenDeTransportChoisi.typeDeTransport == "scooter") {
      const marker = L.marker([this.moyenDeTransportChoisi.latitude, this.moyenDeTransportChoisi.longitude], {icon: this.scootIcon});
      marker.addTo(this.map);
      marker.bindPopup('<h6>Scooter n°</h6>' + this.moyenDeTransportChoisi.numeroDeSerie);
    }
    else {
      const marker = L.marker([this.moyenDeTransportChoisi.latitude, this.moyenDeTransportChoisi.longitude], {icon: this.trotIcon});
      marker.addTo(this.map);
      marker.bindPopup('<h6>Trottinette n°</h6>' + this.moyenDeTransportChoisi.numeroDeSerie);
    }
    L.circle([this.moyenDeTransportChoisi.latitude, this.moyenDeTransportChoisi.longitude], 5, {color: 'blue', fillColor: '#3ebfff', fillOpacity: 0.5}).addTo(this.map);
    L.circle([this.sessionService.getArriveeCoords()[0], this.sessionService.getArriveeCoords()[1]], 5, {color: 'green', fillColor: '#74ff3e', fillOpacity: 0.5}).addTo(this.map);

    let pointA = new L.LatLng(this.client.latitude, this.client.longitude);
    let pointB = new L.LatLng(this.moyenDeTransportChoisi.latitude, this.moyenDeTransportChoisi.longitude);
    let pointC = new L.LatLng(this.sessionService.getArriveeCoords()[0], this.sessionService.getArriveeCoords()[1]);
    
    this.ligne = new L.Polyline([pointA,pointB], undefined ).addTo(this.map);
    this.ligne = new L.Polyline([pointB,pointC], {color: 'green'} ).addTo(this.map);
  }

}

