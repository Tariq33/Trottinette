import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {MoyenDeTransport} from "../../model/moyenDeTransport";
import {MoyenDeTransportService} from "../../service/moyen-de-transport.service";
import {Client} from "../../model/client";
import {ClientService} from "../../service/client.service";


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

  constructor(private moyenDeTransportService: MoyenDeTransportService, private clientService: ClientService) { }

  /*ngAfterViewInit(): void {
    this.createMap();
  }*/

  ngOnInit(): void {
    this.moyenDeTransportService.findAllMoyObs().subscribe(resp => {this.moyensDeTransportObs = resp; this.createMap(); } ,err => console.log(err))
    this.clientService.findById(400).subscribe(resp => this.client = resp, err => console.log(err))
  }

  createMap(){
    const centre = {
      lat: 44.8419,
      lng: -0.5767717
    };

    this.map = L.map('map', {center: [centre.lat, centre.lng], zoom: 15});

    const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      minZoom: 1,
      maxZoom: 20
    });

    mainLayer.addTo(this.map);
    L.marker([centre.lat,centre.lng], {icon: this.hommeIcon}).addTo(this.map);

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
    //else if(type=="scooter"){
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
