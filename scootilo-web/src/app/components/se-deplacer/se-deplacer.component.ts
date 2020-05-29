import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {MoyenDeTransport} from "../../model/moyenDeTransport";
import {MoyenDeTransportService} from "../../service/moyen-de-transport.service";
import {Client} from "../../model/client";
import {ClientService} from "../../service/client.service";
import {SessionService} from "../../service/session.service";
import {Adresse} from "../../model/adresse";
import {AdresseService} from "../../service/adresse.service";


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


  map;
  moyensDeTransportObs: Array<MoyenDeTransport> = new Array<MoyenDeTransport>();
  client: Client;
  ongletReservationShow: boolean = false;

  clickrechercher: boolean = false;

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

  constructor(private adresseService : AdresseService, private moyenDeTransportService: MoyenDeTransportService, private clientService: ClientService, private sessionService: SessionService) {
    if(this.sessionService.getClient().type=="customer"){
      this.clientService.findById(this.sessionService.getClient().id).subscribe(resp => {this.client = resp; this.load();}, err => console.log(err));
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
    if (this.client != undefined) {
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
      if (this.client != undefined) {
        L.marker([centre.lat, centre.lng], {icon: this.hommeIcon}).addTo(this.map);
      }
    }
  }

  addTransports(){
    if (this.map != undefined) {
      for (let tranport of this.moyensDeTransportObs) {
        this.addMarker(tranport);
      }
    }
  }


  testShow(val:boolean) {
    this.ongletReservationShow = val;
    this.cdRef.detectChanges();
    console.log(this.ongletReservationShow);
  }

  isShow():boolean {
    return this.ongletReservationShow;
  }

  addMarker(transport){
    if(transport.typeDeTransport=="velo"){
      const marker = L.marker([transport.latitude, transport.longitude], {icon: this.veloIcon});

      let self: any = this;

      marker.addTo(this.map);
      marker.on("click",event => {
        console.log("ON A CLIQUE");
        this.ongletReservationShow = true;
        //console.log(this.ongletReservationShow);
      })
      marker.bindPopup('<h1>Velo</h1>');
    }
    else if(transport.typeDeTransport=="scooter"){
      const marker = L.marker([transport.latitude,transport.longitude], {icon: this.scootIcon});
      marker.addTo(this.map);
      marker.bindPopup('<h1>Scooter</h1>');
    }
    else{
      const marker = L.marker([transport.latitude,transport.longitude], {icon: this.trotIcon});
      marker.addTo(this.map);
      marker.bindPopup('<h1>Trottinette</h1>');
    }
  }
  }
