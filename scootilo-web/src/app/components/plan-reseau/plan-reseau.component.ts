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
  proximite: Array<object> = new Array<object>();


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
    if(this.sessionService.getClient().type=="customer"){
      this.clientService.findById(this.sessionService.getClient().id).subscribe(resp => {this.client = resp; }, err => console.log(err));
      this.moyenDeTransportService.findAllMoyObs().subscribe(resp => {this.moyensDeTransportObs = resp; this.createMap(); this.addTransports();} ,err => console.log(err));
    }
    else{
      this.moyenDeTransportService.findAllMoyObs().subscribe(resp => {this.moyensDeTransportObs = resp; this.createMap(); this.addTransports();} ,err => console.log(err));
    }
  }

  ngOnInit(): void {

  }

  createMap() {
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
        this.moyenDeTransportService.FindAllTransportsInArea(this.client.latitude, this.client.longitude).subscribe(resp => {this.proximite = resp; }, error => console.log(error));
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

  addMarker(transport){
    if(transport.typeDeTransport=="velo"){
      const marker = L.marker([transport.latitude,transport.longitude], {icon: this.veloIcon});
      marker.addTo(this.map);
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
