import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {MoyenDeTransport} from "../../model/moyenDeTransport";
import {MoyenDeTransportService} from "../../service/moyen-de-transport.service";
import {Client} from "../../model/client";
import {ClientService} from "../../service/client.service";
import {SessionService} from "../../service/session.service";
import {Adresse} from "../../model/adresse";
import {AdresseService} from "../../service/adresse.service";
import {control} from "leaflet";
import layers = control.layers;


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
  trotMarkers = new L.LayerGroup();
  scootMarkers = new L.LayerGroup();
  veloMarkers = new L.LayerGroup();

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

  charger3(bool:boolean, type: string){
    if(type=="trottinette"){
      this.client.preference.trottinette = bool;
      if(!bool) {
        for (let i = 0; i < this.trotMarkers.getLayers().length; i++) {
          this.trotMarkers.getLayers()[i].removeFrom(this.map);
        }
      }
      else{
        for (let i = 0; i < this.trotMarkers.getLayers().length; i++) {
          this.trotMarkers.getLayers()[i].addTo(this.map);
        }
      }
    }
    else if(type=="velo"){
      this.client.preference.velo = bool;
      if(!bool) {
        for (let i = 0; i < this.veloMarkers.getLayers().length; i++) {
          this.veloMarkers.getLayers()[i].removeFrom(this.map);
        }
      }
      else{
        for (let i = 0; i < this.veloMarkers.getLayers().length; i++) {
          this.veloMarkers.getLayers()[i].addTo(this.map);
        }
      }
    }
    else{
      this.client.preference.scooter = bool;
      if(!bool) {
        for (let i = 0; i < this.scootMarkers.getLayers().length; i++) {
          this.scootMarkers.getLayers()[i].removeFrom(this.map);
        }
      }
      else{
        for (let i = 0; i < this.scootMarkers.getLayers().length; i++) {
          this.scootMarkers.getLayers()[i].addTo(this.map);
        }
      }
    }
  }

  load(){
    this.adresseService.FindAddressByUserId(this.sessionService.getClient().id).subscribe(resp => {
      this.adresses =  resp;
    }, error => console.log(error));
  }



  constructor(private adresseService : AdresseService, private moyenDeTransportService: MoyenDeTransportService, private clientService: ClientService, private sessionService: SessionService) {
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
      this.map.addLayer(this.trotMarkers);
      this.map.addLayer(this.scootMarkers);
      this.map.addLayer(this.veloMarkers);
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
   if (transport.typeDeTransport == "velo") {
     const marker = L.marker([transport.latitude, transport.longitude], {icon: this.veloIcon});
     marker.addTo(this.veloMarkers);
     marker.on("click", event => {
       this.isShow();
       this.getTransportClick(transport);
     })
     marker.bindPopup('<h1>Velo</h1>');
     if(this.sessionService.getClient().type=="customer"){
        if(!this.client.preference.velo){
          this.veloMarkers.getLayers()[this.veloMarkers.getLayers().length-1].removeFrom(this.map);
        }
     }
   }
   else if (transport.typeDeTransport == "scooter") {
     const marker = L.marker([transport.latitude, transport.longitude], {icon: this.scootIcon});
     marker.addTo(this.scootMarkers);
     marker.on("click", event => {
       this.isShow();
       this.getTransportClick(transport);
     })
     marker.bindPopup('<h1>Scooter</h1>');
     if(this.sessionService.getClient().type=="customer"){
       if(!this.client.preference.scooter){
         this.scootMarkers.getLayers()[this.scootMarkers.getLayers().length-1].removeFrom(this.map);
       }
     }
   }
   else {
     const marker = L.marker([transport.latitude, transport.longitude], {icon: this.trotIcon});
     marker.addTo(this.trotMarkers);
     marker.on("click", event => {
       this.isShow();
       this.getTransportClick(transport);
     })
     marker.bindPopup('<h1>Trottinette</h1>');
     if(this.sessionService.getClient().type=="customer"){
       if(!this.client.preference.trottinette){
         this.trotMarkers.getLayers()[this.trotMarkers.getLayers().length-1].removeFrom(this.map);
       }
     }
   }

 }

  getTransportClick(transport) {
    this.moyenTransportClick = transport;
    this.sessionService.setMoyenDeTransportReserve(transport);
  }


  }
