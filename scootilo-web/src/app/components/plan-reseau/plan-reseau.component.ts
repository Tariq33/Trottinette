import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';
import {MoyenDeTransport} from "../../model/moyenDeTransport";
import {MoyenDeTransportService} from "../../service/moyen-de-transport.service";
import {Client} from "../../model/client";
import {ClientService} from "../../service/client.service";
import {SessionService} from "../../service/session.service";


@Component({
  selector: 'app-plan-reseau',
  templateUrl: './plan-reseau.component.html',
  styleUrls: ['./plan-reseau.component.scss']
})
//export class PlanReseauComponent implements AfterViewInit {
export class PlanReseauComponent implements OnInit {
  map;
  moyensDeTransportObs: Array<MoyenDeTransport> = new Array<MoyenDeTransport>();
  client: Client;

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

  constructor(private moyenDeTransportService: MoyenDeTransportService, private clientService: ClientService, private sessionService: SessionService) {
    if(this.sessionService.getClient().id!=undefined){
      console.log("if");
      this.clientService.findById(this.sessionService.getClient().id).subscribe(resp => {this.client = resp; this.createMap();}, err => console.log(err));
      this.moyenDeTransportService.findAllMoyObs().subscribe(resp => {this.moyensDeTransportObs = resp; this.addTransports();} ,err => console.log(err));
    }
    else{
      console.log("else");
      this.moyenDeTransportService.findAllMoyObs().subscribe(resp => {this.moyensDeTransportObs = resp; this.createMap(); this.addTransports();} ,err => console.log(err));
    }
  }

  /*ngAfterViewInit(): void {
    this.createMap();
  }*/

  ngOnInit(): void {

  }

  createMap() {
    console.log("0");
    const centre = {
      lat: 44.8377285,
      lng: -0.5765286,
    };
    console.log("1");
    if (this.client != undefined) {
      console.log("1");
      centre.lat = this.client.latitude;
      centre.lng = this.client.longitude;
    }
    console.log("3");

    const zoomLevel = 14;
    this.map = L.map('map', {center: [centre.lat, centre.lng], zoom: zoomLevel});

    /*const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',*/
    const mainLayer = L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> contributors',
      minZoom: 2,
      maxZoom: 19
    });

    mainLayer.addTo(this.map);
    if (this.client != undefined) {
      L.marker([centre.lat, centre.lng], {icon: this.hommeIcon}).addTo(this.map);
    }

    /*L.Routing.control({
      geocoder: L.control.Geocoder.nominatim()
    }).addTo(this.map);
    L.Control.geocoder().addTo(this.map);*/

  }

  addTransports(){
    for (let tranport of this.moyensDeTransportObs ){
      this.addMarker(tranport);
    }
  }

  addMarker(transport){
    if(transport.typeDeTransport=="velo"){
      const marker = L.marker([transport.latitude,transport.longitude], {icon: this.veloIcon});
      marker.addTo(this.map);
      marker.on("click",function () {
        console.log("ON A CLIQUE");
      })
      marker.bindPopup('<h1>velo</h1>');
    }
    else if(transport.typeDeTransport=="scooter"){
      const marker = L.marker([transport.latitude,transport.longitude], {icon: this.scootIcon});
      marker.addTo(this.map);
      marker.bindPopup('<p>OK</p>');
      //marker.bindTooltip('test');
    }
    else{
      const marker = L.marker([transport.latitude,transport.longitude], {icon: this.trotIcon});
      marker.addTo(this.map);
      marker.bindPopup('<h1>trot</h1>');
    }
  }

}
