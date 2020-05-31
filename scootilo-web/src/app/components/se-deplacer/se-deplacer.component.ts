import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {MoyenDeTransport} from "../../model/moyenDeTransport";
import {MoyenDeTransportService} from "../../service/moyen-de-transport.service";
import {Client} from "../../model/client";
import {ClientService} from "../../service/client.service";
import {SessionService} from "../../service/session.service";
import {Adresse} from "../../model/adresse";
import {AdresseService} from "../../service/adresse.service";
import {GeocodingService} from '../../service/geocoding.service';


@Component({
  selector: 'app-se-deplacer',
  templateUrl: './se-deplacer.component.html',
  styleUrls: ['./se-deplacer.component.scss']
})
//export class PlanReseauComponent implements AfterViewInit {
export class SeDeplacerComponent implements OnInit {
  adrDepart : string = null
  adrDepartListe : string = null
  adrArrivee : string = null
  adrArriveeListe : string = null
  adresses: Array<Adresse> = new Array<Adresse>();
  moyenTransportClick: MoyenDeTransport = new MoyenDeTransport();
  ongletReservationItineraireShow: boolean = false;
  map;
  moyensDeTransportObs: Array<MoyenDeTransport> = new Array<MoyenDeTransport>();
  client: Client = new Client();
  ongletReservationShow: boolean = false;


    reservationItineraire = {
    'moyendeTransportClick' : new MoyenDeTransport(),
    'numeroRue' : null,
    'rue' : null,
    'ville' : null,
    'tempsDeMarche' : null,
  };

  veloIcon = new L.Icon({
    iconUrl: '../../../assets/icon-velo.png'
  });

  scootIcon = new L.Icon({
    iconUrl: '../../../assets/icon-scoot.png'
  });

  trotIcon = new L.Icon({
    iconUrl: '../../../assets/icon-trot.png'
  });

  hommeIcon = new L.Icon({
    iconUrl: '../../../assets/icon-homme.png'
  });



  charger(nom:string){
    for (let adr of this.adresses){
      if(adr.nomAdresse==nom){
        this.adrDepart=adr.rue+" "+adr.codePostal+" "+adr.ville;
        return;
      }
    }
  }

  charger2(nom:string){
    for (let adr of this.adresses){
      if(adr.nomAdresse==nom){
        this.adrArrivee=adr.rue+" "+adr.codePostal+" "+adr.ville;
        return;
      }
    }
  }

  load(){
    this.adresseService.FindAddressByUserId(this.sessionService.getClient().id).subscribe(resp => {
      this.adresses =  resp;
    }, error => console.log(error));
  }



  constructor(private geocodingService: GeocodingService, private adresseService : AdresseService, private moyenDeTransportService: MoyenDeTransportService, private clientService: ClientService, private sessionService: SessionService) {
    if(this.sessionService.getClient().type=="customer"){
      this.client=sessionService.getClient();
      this.load();
      this.moyenDeTransportService.findAllMoyObs().subscribe(resp => {this.moyensDeTransportObs = resp; this.createMap(); this.addTransports();} ,err => console.log(err));
    }
    else{
      this.moyenDeTransportService.findAllMoyObs().subscribe(resp => {this.moyensDeTransportObs = resp; this.createMap(); this.addTransports();} ,err => console.log(err));
    }
  }


  /*ngAfterViewInit(): void {
    this.createMap();
  }*/

  ngOnInit(): void {

  }

  createMap(){
    const centre = {
      lat: 44.8377285,
      lng: -0.5765286,
    };
    if(this.sessionService.getClient().type=="customer"){
      centre.lat = this.client.latitude;
      centre.lng = this.client.longitude;
    }

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

  addTransports(){
    if (this.map != undefined) {
      for (let transport of this.moyensDeTransportObs) {
        this.addMarker(transport);
      }
    }
  }

  isShowItineraire() {
    this.ongletReservationShow = false;
    this.ongletReservationItineraireShow = true;
  }

  isShow() {
    this.ongletReservationShow = true;
    this.ongletReservationItineraireShow = false;
  }

 addMarker(transport){
   if(this.sessionService.getClient().type!="customer"){

     if (transport.typeDeTransport == "velo") {
       const marker = L.marker([transport.latitude, transport.longitude], {icon: this.veloIcon});
       marker.addTo(this.map);
       marker.on("click", event => {
         console.log("VELO");
         this.isShow();
         this.getTransportClick(transport);
       })
       marker.bindPopup('<h1>Velo</h1>');
     } else if (transport.typeDeTransport == "scooter") {
       const marker = L.marker([transport.latitude, transport.longitude], {icon: this.scootIcon});
       marker.addTo(this.map);
       marker.on("click", event => {
         console.log("SCOOTER");
         this.isShow();
         this.getTransportClick(transport);
       })
       marker.bindPopup('<h1>Scooter</h1>');
     } else {
       const marker = L.marker([transport.latitude, transport.longitude], {icon: this.trotIcon});
       marker.addTo(this.map);
       marker.on("click", event => {
         console.log("TROTTINETTE");
         this.isShow();
         this.getTransportClick(transport);
       })
       marker.bindPopup('<h1>Trottinette</h1>');
     }

   }
   else{

     if ((transport.typeDeTransport == "velo" && this.client.preference.velo) || (this.client.preference.velo==false && this.client.preference.scooter==false && this.client.preference.trottinette==false)) {
       const marker = L.marker([transport.latitude, transport.longitude], {icon: this.veloIcon});
       marker.addTo(this.map);
       marker.on("click", event => {
         console.log("VELO");
         //this.isShowItineraire();
         this.isShow();
         this.getTransportClick(transport);
       })
       marker.bindPopup('<h1>Velo</h1>');
     } else if ((transport.typeDeTransport === "scooter" && this.client.preference.scooter) || (this.client.preference.velo==false && this.client.preference.scooter==false && this.client.preference.trottinette==false)) {
       const marker = L.marker([transport.latitude, transport.longitude], {icon: this.scootIcon});
       marker.addTo(this.map);
       marker.on("click", event => {
         console.log("SCOOTER");
         this.isShow();
         this.getTransportClick(transport);
       })
       marker.bindPopup('<h1>Scooter</h1>');
     } else if((transport.typeDeTransport === "trottinette" && this.client.preference.trottinette) || (this.client.preference.velo==false && this.client.preference.scooter==false && this.client.preference.trottinette==false)){
       const marker = L.marker([transport.latitude, transport.longitude], {icon: this.trotIcon});
       marker.addTo(this.map);
       marker.on("click", event => {
         console.log("TROTTINETTE");
         this.isShow();
         this.getTransportClick(transport);
       })
       marker.bindPopup('<h1>Trottinette</h1>');
     }

   }

  }

  getTransportClick(transport) {
    this.reservationItineraire.moyendeTransportClick = transport;
    this.geocodingService.getAddressWithGps(this.reservationItineraire.moyendeTransportClick.latitude, this.reservationItineraire.moyendeTransportClick.longitude).subscribe(resp => {
    this.reservationItineraire.numeroRue = resp.address.house_number;
    this.reservationItineraire.rue = resp.address.road;
    this.reservationItineraire.ville = resp.address.city;
    //on part sur le postulat de 5km/h
      let distance = this.getDistance([this.client.latitude, this.client.longitude], [this.reservationItineraire.moyendeTransportClick.latitude, this.reservationItineraire.moyendeTransportClick.longitude]);
      let temps = distance / (5/3.6);  //km/h en m/s => /3.6
      this.secondsToHms(temps);
      this.reservationItineraire.tempsDeMarche = this.secondsToHms(temps);
    this.sessionService.setAdresseMoyenDeTransportReservee(this.reservationItineraire);
      })
    }

  getDistance(origin, destination) {
    // return distance in meters
    var lon1 = this.toRadian(origin[1]),
      lat1 = this.toRadian(origin[0]),
      lon2 = this.toRadian(destination[1]),
      lat2 = this.toRadian(destination[0]);

    var deltaLat = lat2 - lat1;
    var deltaLon = lon2 - lon1;

    var a = Math.pow(Math.sin(deltaLat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon/2), 2);
    var c = 2 * Math.asin(Math.sqrt(a));
    var EARTH_RADIUS = 6371;
    return c * EARTH_RADIUS * 1000;
  }

  toRadian(degree) {
    return degree*Math.PI/180;
  }

  secondsToHms(d: number) {
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
  }


}
