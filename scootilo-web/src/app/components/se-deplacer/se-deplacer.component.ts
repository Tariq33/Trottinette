import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {MoyenDeTransport} from "../../model/moyenDeTransport";
import {MoyenDeTransportService} from "../../service/moyen-de-transport.service";
import {Client} from "../../model/client";
import {ClientService} from "../../service/client.service";
import {SessionService} from "../../service/session.service";


@Component({
  selector: 'app-se-deplacer',
  templateUrl: './se-deplacer.component.html',
  styleUrls: ['./se-deplacer.component.scss']
})
//export class PlanReseauComponent implements AfterViewInit {
export class SeDeplacerComponent implements OnInit {
  map;
  moyensDeTransportObs: Array<MoyenDeTransport> = new Array<MoyenDeTransport>();
  client: Client;

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

  constructor(private moyenDeTransportService: MoyenDeTransportService, private clientService: ClientService, private sessionService: SessionService) {
    this.clientService.findById(this.sessionService.getClient().id).subscribe(resp => {this.client = resp; this.createMap();}, err => console.log(err));
    this.moyenDeTransportService.findAllMoyObs().subscribe(resp => {this.moyensDeTransportObs = resp; this.addTransports();} ,err => console.log(err));
  }

  /*ngAfterViewInit(): void {
    this.createMap();
  }*/

  ngOnInit(): void {

  }

  createMap(){
    const centre = {
      lat: this.client.latitude,
      lng: this.client.longitude,
    };

    const zoomLevel = 14;
    this.map = L.map('map', {center: [centre.lat, centre.lng], zoom: zoomLevel});

    const mainLayer = L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> contributors',
      minZoom: 2,
      maxZoom: 19
    });

    mainLayer.addTo(this.map);
    L.marker([centre.lat,centre.lng], {icon: this.hommeIcon}).addTo(this.map);

    for (let tranport of this.moyensDeTransportObs ){
      this.addMarker(tranport);
    }

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
    }
    else{
      const marker = L.marker([transport.latitude,transport.longitude], {icon: this.trotIcon});
      marker.addTo(this.map);
      marker.bindPopup('<h1>trot</h1>');
    }
  }

}
