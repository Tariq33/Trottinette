import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
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
import {Pref} from "../../model/preference2";
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
  latDepart: number;
  lonDepart: number;
  latArrivee: number;
  lonArrivee: number;
  adresses: Array<Adresse> = new Array<Adresse>();
  moyenDeTransportChoisi: MoyenDeTransport = new MoyenDeTransport();
  ongletReservationItineraireShow: boolean = false;
  map;
  moyensDeTransportObs: Array<MoyenDeTransport> = new Array<MoyenDeTransport>();
  client: Client = new Client();
  ongletReservationShow: boolean = false;
  trotMarkers = new L.LayerGroup();
  scootMarkers = new L.LayerGroup();
  veloMarkers = new L.LayerGroup();

  lessWalkingTransport: MoyenDeTransport;
  adresseAndTempsDeMarcheTransportChoisi = {
  'adresse': null,
    'tempsDeMarche' : null,
  };

  // On récupère les icônes des moyens de transport
  veloIcon = new L.Icon({ iconUrl: '../../../assets/icon-velo.png' });
  scootIcon = new L.Icon({ iconUrl: '../../../assets/icon-scoot.png' });
  trotIcon = new L.Icon({ iconUrl: '../../../assets/icon-trot.png' });
  hommeIcon = new L.Icon({ iconUrl: '../../../assets/icon-homme.png' });
  distance: number;

  constructor(private geocodingService: GeocodingService, private adresseService : AdresseService, private moyenDeTransportService: MoyenDeTransportService, private clientService: ClientService, private sessionService: SessionService) {
    if(this.sessionService.getClient().type=="customer"){
      this.client=sessionService.getClient();
      if(this.client.preference==null){
        this.client.preference = new Pref(true,true,true,false,false,false);
      }
      this.loadCustomerAddresses();
      this.moyenDeTransportService.findAllMoyObs().subscribe(resp => {
        this.moyensDeTransportObs = resp;
        this.createMap();
        this.addTransports();
        },err => console.log(err));
    }
    else{
      this.moyenDeTransportService.findAllMoyObs().subscribe(resp => {
        this.moyensDeTransportObs = resp;
        this.createMap();
        this.addTransports();
        },err => console.log(err));
    }
  }

  ngOnInit(): void {

  }

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

  charger3(bool:boolean, type: string) {
    if (type == "trottinette") {
      this.client.preference.trottinette = bool;
      if (!bool) {
        for (let i = 0; i < this.trotMarkers.getLayers().length; i++) {
          this.trotMarkers.getLayers()[i].removeFrom(this.map);
        }
      } else {
        for (let i = 0; i < this.trotMarkers.getLayers().length; i++) {
          this.trotMarkers.getLayers()[i].addTo(this.map);
        }
      }
    } else if (type == "velo") {
      this.client.preference.velo = bool;
      if (!bool) {
        for (let i = 0; i < this.veloMarkers.getLayers().length; i++) {
          this.veloMarkers.getLayers()[i].removeFrom(this.map);
        }
      } else {
        for (let i = 0; i < this.veloMarkers.getLayers().length; i++) {
          this.veloMarkers.getLayers()[i].addTo(this.map);
        }
      }
    } else {
      this.client.preference.scooter = bool;
      if (!bool) {
        for (let i = 0; i < this.scootMarkers.getLayers().length; i++) {
          this.scootMarkers.getLayers()[i].removeFrom(this.map);
        }
      } else {
        for (let i = 0; i < this.scootMarkers.getLayers().length; i++) {
          this.scootMarkers.getLayers()[i].addTo(this.map);
        }
      }
    }
  }


  // Récupère les adresses du clients
  loadCustomerAddresses(){
    this.adresseService.FindAddressByUserId(this.sessionService.getClient().id).subscribe(resp => {
      this.adresses =  resp;
    }, error => console.log(error));
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
    if(this.adrDepart!=null && this.adrArrivee!=null) {
      this.geocodingService.getGpsWithAddress(this.adrDepart).subscribe(resp => {
        this.latDepart = resp[0].lat;
        this.lonDepart = resp[0].lon;
        this.saveCoord();
      }, error => console.log(error));
      this.geocodingService.getGpsWithAddress(this.adrArrivee).subscribe(resp => {
        this.latArrivee = resp[0].lat;
        this.lonArrivee = resp[0].lon;
        this.saveCoord();
        this.lessWalking();
      }, error => console.log(error));
    }
    this.ongletReservationShow = false;
    this.ongletReservationItineraireShow = true;
  }

  saveCoord(){

  }

  lessWalking(){
    console.log("--------------");
    console.log("DEPART -> lat : ", this.latDepart," - long : ", this.lonDepart);
    console.log("ARRIVEE -> lat : ", this.latArrivee," - long : ", this.lonArrivee);
    this.distance = -1;
    this.lessWalkingTransport = null;
    for (let t of this.moyensDeTransportObs){
      console.log(t.typeDeTransport, "n°", t.numeroDeSerie, "disponible? ", t.disponible);
      console.log("this.client.preference.velo",this.client.preference.velo, "this.client.preference.scooter", this.client.preference.scooter, "this.client.preference.trottinette", this.client.preference.trottinette);
      if(t.disponible){
        if( (t.typeDeTransport=="velo" && this.client.preference.velo) || (t.typeDeTransport=="scooter" && this.client.preference.scooter) ||(t.typeDeTransport=="trottinette" && this.client.preference.trottinette) ){
          if(this.distance == -1){
            this.distance = this.getDistance2(this.latDepart, this.lonDepart, t.latitude, t.longitude);
            this.lessWalkingTransport = t;
          }
          else if(this.distance > this.getDistance2(this.latDepart, this.lonDepart, t.latitude, t.longitude) ){
            this.distance = this.getDistance2(this.latDepart, this.lonDepart, t.latitude, t.longitude);
            this.lessWalkingTransport = t;
          }
        }
      }
    }
  }

  isShow() {
    this.ongletReservationShow = true;
    this.ongletReservationItineraireShow = false;
  }


  //Gère l'affichage des moyens de transport sur la carte
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
        if(!this.client.preference.velo && (this.client.preference.scooter || this.client.preference.trottinette)){
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
       if(!this.client.preference.scooter && (this.client.preference.velo || this.client.preference.trottinette)){
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
       if(!this.client.preference.trottinette && (this.client.preference.scooter || this.client.preference.velo)){
         this.trotMarkers.getLayers()[this.trotMarkers.getLayers().length-1].removeFrom(this.map);
       }
     }
   }
 }

  //Récupère les données du moyen de transport sur lequel on a cliqué
  getTransportClick(transport) {
    this.moyenDeTransportChoisi = transport;
    this.geocodingService.getAddressWithGps(this.moyenDeTransportChoisi.latitude, this.moyenDeTransportChoisi.longitude).subscribe(resp => {
    this.adresseAndTempsDeMarcheTransportChoisi.adresse = resp.display_name;
    //on part sur le postulat de 5km/h
      let distance = this.getDistance([this.client.latitude, this.client.longitude], [this.moyenDeTransportChoisi.latitude, this.moyenDeTransportChoisi.longitude]);
      let temps = distance / (5/3.6);  //km/h en m/s => /3.6
      this.secondsToHms(temps);
      this.adresseAndTempsDeMarcheTransportChoisi.tempsDeMarche = this.secondsToHms(temps);
    this.sessionService.setMoyenDeTransportReserve(this.moyenDeTransportChoisi);
    this.sessionService.setAdresseAndTempsDeMarche(this.adresseAndTempsDeMarcheTransportChoisi);
      })
  }


  getDistance2(lat1: number, lon1: number, lat2: number, lon2: number){
    console.log(6371*this.toRadian(Math.acos(Math.sin(lat1)*Math.sin(lat2)+Math.cos(lat1)*Math.cos(lat2)*Math.cos(lon2-lon1))));
    return 6371*this.toRadian(Math.acos(Math.sin(lat1)*Math.sin(lat2)+Math.cos(lat1)*Math.cos(lat2)*Math.cos(lon2-lon1)));

  }

  //Calcule la distance entre deux points
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

  //Convertit en degrés
  toRadian(degree) {
    return degree*Math.PI/180;
  }

  //Transport un nombre de secondes en un objet heure/minute/seconde
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
