import {Component, OnInit} from '@angular/core';
import {GeocodingService} from "../../service/geocoding.service";
import {MoyenDeTransport} from "../../model/moyenDeTransport";
import {Client} from "../../model/client";
import {TypeDeTransport} from "../../model/type-de-transport.enum";
import {TypeMoteur} from "../../model/type-moteur.enum";
import {AdresseItineraire} from "../../model/adresseItineraire";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {


  moyensDeTransport: Array<MoyenDeTransport> = new Array<MoyenDeTransport>();
  tempsDeMarche: Array<number> = new Array<number>();
  prix: Array<number> = new Array<number>();
  dureeEstimee: Array<number> = new Array<number>();

  constructor(private geocodingService : GeocodingService) {
  this.testMoyenDeTransport();
  }

  ngOnInit(): void {
  }

  testMoyenDeTransport() {
    let client = new Client();
    client.latitude=44.830101;
    client.longitude=-0.570205;


    let adresseDepart = new AdresseItineraire();
    adresseDepart.latitude=44.8316;
    adresseDepart.longitude=-0.55951;

    let adresseArrivee = new AdresseItineraire();
    adresseArrivee.latitude=44.84114;
    adresseArrivee.longitude=-0.57816;

    let m1 = new MoyenDeTransport(1,0,-0.58241,44.839073,TypeDeTransport.trottinette,0,TypeMoteur.Electrique,0,1);
    let m2 = new MoyenDeTransport(1,0,-0.586104,44.832089,TypeDeTransport.trottinette,0,TypeMoteur.Electrique,0,1);
    let m3 = new MoyenDeTransport(1,0,-0.580439,44.831632,TypeDeTransport.velo,0,TypeMoteur.Electrique,0,2);
    let m4 = new MoyenDeTransport(1,0,-0.567564,44.833336,TypeDeTransport.scooter,0,TypeMoteur.Electrique,0,4);
    let m5 = new MoyenDeTransport(1,0,-0.554260,44.838449,TypeDeTransport.velo,0,TypeMoteur.Electrique,0,2);
    let m6 = new MoyenDeTransport(1,0,-0.577887,44.829127,TypeDeTransport.velo,0,TypeMoteur.Electrique,0,2);
    let m7 = new MoyenDeTransport(1,0,-0.566171,44.824287,TypeDeTransport.scooter,0,TypeMoteur.Electrique,0,4);
    let m8 = new MoyenDeTransport(1,0,-0.561709,44.822309,TypeDeTransport.velo,0,TypeMoteur.Electrique,0,2);
    let m9 = new MoyenDeTransport(1,0,-0.562652,44.833297,TypeDeTransport.trottinette,0,TypeMoteur.Electrique,0,1);
    let m10= new MoyenDeTransport(1,0,-0.554756,44.829492,TypeDeTransport.velo,0,TypeMoteur.Electrique,0,2);
    this.moyensDeTransport.push(m1,m2,m3,m4,m5,m6,m7,m8,m9,m10);

    // en m
    var distanceEnMoyenDeTransport = this.getDistance([adresseDepart.latitude,adresseDepart.longitude], [adresseArrivee.latitude,adresseArrivee.longitude])
    // environ 1800m

    for(let moyenDeTransport of this.moyensDeTransport){

      // en m/s
      let vitesseMoyenne;
      if(moyenDeTransport.typeDeTransport==TypeDeTransport.velo) vitesseMoyenne=16/3.6; // (16km/h en m/s)
      else if(moyenDeTransport.typeDeTransport==TypeDeTransport.scooter) vitesseMoyenne=30/3.6; // (30 étant donné que ce sont des scooters électriques ?)
      else vitesseMoyenne =25/3.6; // en trottinette



      // en s puis en minutes pour multiplier par la donnée prixParMinute
      console.log(vitesseMoyenne);
      let dureeEstimeeEnSecondes = distanceEnMoyenDeTransport / vitesseMoyenne;
      let dureeEstimeeEnMinutes = dureeEstimeeEnSecondes/60;

      // en m
      let distanceDeMarche = this.getDistance([client.latitude,client.longitude], [moyenDeTransport.latitude,moyenDeTransport.longitude]);
      let tempsDeMarche = distanceDeMarche/(4/3.6); // On marche à 4 km/h qu'on met en m/s


      let prixDeLaCourse = moyenDeTransport.prixMinute * dureeEstimeeEnMinutes;

      // On remplit les tableaux petit à petit
      this.tempsDeMarche.push(tempsDeMarche);
      this.prix.push(prixDeLaCourse);
      this.dureeEstimee.push(dureeEstimeeEnMinutes + tempsDeMarche);


    }

    console.log(this.tempsDeMarche);
    console.log(this.prix);
    console.log(this.dureeEstimee);

    let idDuMoyenDeTransportLePlusRapide;
    let idDuMoyenDeTransportLeMoinsCher;
    let idDuMoyenDeTransportAvecLeMoinsDeMarche;

    // Faut boucler pour récupérer l'id : id du moyen de transport = id de sa place dans la liste (ou sa place -1 à voir);

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
}
