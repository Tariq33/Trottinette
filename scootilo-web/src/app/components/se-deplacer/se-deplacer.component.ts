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
import {AdresseItineraire} from "../../model/adresseItineraire";
import {TypeDeTransport} from "../../model/type-de-transport.enum";
import {TypeMoteur} from "../../model/type-moteur.enum";
import {Observable, timer} from 'rxjs';
import {FinDeTrajet} from "../../model/finDeTrajet";


@Component({
  selector: 'app-se-deplacer',
  templateUrl: './se-deplacer.component.html',
  styleUrls: ['./se-deplacer.component.scss']
})
//export class PlanReseauComponent implements AfterViewInit {
export class SeDeplacerComponent implements OnInit {
  adrDepart : string = null;
  adrDepartListe : string = null;
  adrArrivee : string = null;
  adrArriveeListe : string = null;
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

  transportAvecLeMoinsDeMarche: MoyenDeTransport  = new MoyenDeTransport();
  transportLeMoinsCher: MoyenDeTransport = new MoyenDeTransport();
  transportLeMoinsLong: MoyenDeTransport = new MoyenDeTransport();
  donneesDuMoinsDeMarche : Array<number> = null;
  donneesDuMoinsCher : Array<number>;
  donneesDuMoinsLong : Array<number>;
  emplacementTransportAvecLeMoinsDeMarche: string = null;
  emplacementTransportLeMoinsLong : string = null;
  emplacementTransportLeMoinsCher : string = null;

  time: number = 0;

  affichage : number =1;

  departPositionClient : boolean = false;

  pasDePreferencesCochees : boolean;
  nomAdressePositionclient : string = "Ma position";

  adresseAndTempsDeMarcheTransportChoisi = {
    'adresse' : null,
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
    console.log(nom);
    for (let adr of this.adresses){
      if(adr.nomAdresse==nom){
        this.adrDepart=adr.rue+" "+adr.codePostal+" "+adr.ville;
        return;
      }
    }
    if(nom==this.nomAdressePositionclient){
      this.geocodingService.getAddressWithGps(this.client.latitude, this.client.longitude).subscribe(resp => {
        this.adrDepart=resp.display_name;
      }, error => console.log(error));
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
  if(this.adrDepart==null || this.adrArrivee==null){
    this.pasDePreferencesCochees=true;
    return;
  }

  if((this.client.preference.velo==false && this.client.preference.scooter==false && this.client.preference.trottinette==false)){
    this.pasDePreferencesCochees=true;
    return;
  }
  else this.pasDePreferencesCochees=false;

    var adresseDepart = new AdresseItineraire();
    var adresseArrivee = new AdresseItineraire();

    this.geocodingService.getGpsWithAddress(this.adrDepart).subscribe(resp => {
      adresseDepart.latitude = resp[0].lat;
      adresseDepart.longitude = resp[0].lon;

      this.geocodingService.getGpsWithAddress(this.adrArrivee).subscribe(resp => {
        adresseArrivee.latitude = resp[0].lat;
        adresseArrivee.longitude = resp[0].lon;
        this.testMoyenDeTransport(this.moyensDeTransportObs,this.client, adresseDepart, adresseArrivee);
        this.ongletReservationShow = false;
        this.ongletReservationItineraireShow = true;
      }, error => console.log(error));

    }, error => console.log(error));
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
     marker.bindPopup('<h6>Velo n°</h6>' + transport.numeroDeSerie);
     //marker.;
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
     marker.bindPopup('<h6>Scooter n°</h6>' + transport.numeroDeSerie);
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
     marker.bindPopup('<h6>Trottinette n°</h6>' + transport.numeroDeSerie);
     if(this.sessionService.getClient().type=="customer"){
       if(!this.client.preference.trottinette && (this.client.preference.scooter || this.client.preference.velo)){
         this.trotMarkers.getLayers()[this.trotMarkers.getLayers().length-1].removeFrom(this.map);
       }
     }
   }
   L.circle([transport.latitude, transport.longitude], 5, {color: transport.disponible ? 'green':'red', fillColor: transport.disponible ? '#74ff3e' : '#f03', fillOpacity: 0.5}).addTo(this.map);
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
    var hDisplay = h > 0 ? h + (h == 1 ? " heure, " : " heures, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " seconde" : " secondes") : "";
    return hDisplay + mDisplay + sDisplay;
  }


  testMoyenDeTransport(moyensDeTransport: Array<MoyenDeTransport>, client : Client, adresseDepart:AdresseItineraire, adresseArrivee : AdresseItineraire ){
    console.log("on rentre dans la fonction");


    // On filtre selon les préférences
    let preferences = client.preference;
    let moyensDeTransportFiltres: Array<MoyenDeTransport> = new Array<MoyenDeTransport>();

    for(let i in moyensDeTransport){
      if((preferences.velo==true && moyensDeTransport[i].typeDeTransport=="velo")
        || (preferences.scooter==true && moyensDeTransport[i].typeDeTransport=="scooter")
        || (preferences.trottinette==true && moyensDeTransport[i].typeDeTransport=="trottinette")) {
        moyensDeTransportFiltres.push(moyensDeTransport[i]);
      }
    }

    // A partir de là on cherche l'id du moins cher du plus rapide et du moins de marche;
    let tempsLeMoinsLong= 99999999;
    let prixLeMoinsCher = 99999999;
    let tempsDeMarcheLeMoinsLong = 99999999;

    let moyenDeTransportLeMoinsLong : MoyenDeTransport = new MoyenDeTransport();
    let moyenDeTransportLeMoinsCher : MoyenDeTransport = new MoyenDeTransport();
    let moyenDeTransportAvecLeMoinsDeMarche : MoyenDeTransport = new MoyenDeTransport();

    for(let moyenDeTransport of moyensDeTransportFiltres){
      if(moyenDeTransport.disponible && moyenDeTransport.distanceEstimee>1.2*this.getDistance([moyenDeTransport.latitude, moyenDeTransport.longitude],[adresseArrivee.latitude, adresseArrivee.longitude])) {

        // en m
        var distanceEnMoyenDeTransport = this.getDistance([moyenDeTransport.latitude, moyenDeTransport.longitude], [adresseArrivee.latitude, adresseArrivee.longitude]);

        // en m/s
        let vitesseMoyenne;
        if (moyenDeTransport.typeDeTransport == TypeDeTransport.velo) vitesseMoyenne = 16 / 3.6; // (16km/h en m/s)
        else if (moyenDeTransport.typeDeTransport == TypeDeTransport.scooter) vitesseMoyenne = 30 / 3.6; // (30 étant donné que ce sont des scooters électriques ?)
        else vitesseMoyenne = 25 / 3.6; // en trottinette

        // en s puis en minutes pour multiplier par la donnée prixParMinute
        let dureeEstimeeEnSecondes = distanceEnMoyenDeTransport / vitesseMoyenne;
        let dureeEstimeeEnMinutes = dureeEstimeeEnSecondes / 60;

        // en m
        let distanceDeMarche = this.getDistance([adresseDepart.latitude, adresseDepart.longitude], [moyenDeTransport.latitude, moyenDeTransport.longitude]);

        // On a ce qu'on recherche :
        let tempsDeMarche = Math.round((distanceDeMarche / (5 / 3.6))/60); // On marche à 4 km/h qu'on met en m/s
        let dureeTotaleDeLaCourse = Math.round((dureeEstimeeEnSecondes + tempsDeMarche*60)/60);
        let prixDeLaCourse = Math.round(moyenDeTransport.prixMinute * dureeEstimeeEnMinutes*100)/100;


        if (tempsDeMarche < tempsDeMarcheLeMoinsLong) {
          tempsDeMarcheLeMoinsLong = tempsDeMarche;
          moyenDeTransportAvecLeMoinsDeMarche = moyenDeTransport;
          this.donneesDuMoinsDeMarche = [prixDeLaCourse, dureeTotaleDeLaCourse, tempsDeMarche];
        }
        if (prixDeLaCourse < prixLeMoinsCher) {
          prixLeMoinsCher = prixDeLaCourse;
          moyenDeTransportLeMoinsLong = moyenDeTransport;
          this.donneesDuMoinsCher = [prixDeLaCourse, dureeTotaleDeLaCourse, tempsDeMarche];
        }
        if (dureeTotaleDeLaCourse < tempsLeMoinsLong) {
          tempsLeMoinsLong = dureeTotaleDeLaCourse;
          moyenDeTransportLeMoinsCher = moyenDeTransport;
          this.donneesDuMoinsLong = [prixDeLaCourse, dureeTotaleDeLaCourse, tempsDeMarche];
        }
      }
    }

    timer(0, 1000).subscribe(ellapsedCycles => {
      if(this.time == 0) {
        this.geocodingService.getAddressWithGps(this.transportAvecLeMoinsDeMarche.latitude, this.transportAvecLeMoinsDeMarche.longitude).subscribe(resp => {
          this.emplacementTransportAvecLeMoinsDeMarche = resp.display_name;
        })
      }
      if(this.time == 1) {
        this.geocodingService.getAddressWithGps(this.transportLeMoinsLong.latitude, this.transportLeMoinsLong.longitude).subscribe(resp => {
          this.emplacementTransportLeMoinsLong = resp.display_name;
        })
      }
      if(this.time == 2) {

        this.geocodingService.getAddressWithGps(this.transportLeMoinsCher.latitude, this.transportLeMoinsCher.longitude).subscribe(resp => {
          this.emplacementTransportLeMoinsCher = resp.display_name;
        })
      }
      if(this.time == 4) {
        //A définir comment stopper un starter
      }
      this.time++;
    });
    this.transportAvecLeMoinsDeMarche=moyenDeTransportAvecLeMoinsDeMarche;
    this.transportLeMoinsLong=moyenDeTransportLeMoinsLong;
    this.transportLeMoinsCher=moyenDeTransportLeMoinsCher;
  }

  affichageFunction(nombre : number){
    this.affichage=nombre;

  }

}
