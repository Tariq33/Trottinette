import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {MoyenDeTransport} from "../../model/moyenDeTransport";
import {MoyenDeTransportService} from "../../service/moyen-de-transport.service";
import {Client} from "../../model/client";
import {ClientService} from "../../service/client.service";


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

  constructor(private moyenDeTransportService: MoyenDeTransportService, private clientService: ClientService) { }

  /*ngAfterViewInit(): void {
    this.createMap();
  }*/

  ngOnInit(): void {
    this.moyenDeTransportService.findAllMoyObs().subscribe(resp => {this.moyensDeTransportObs = resp; this.createMap(); } ,err => console.log(err))
    this.clientService.findById(323).subscribe(resp => this.client = resp, err => console.log(err))
  }

  createMap(){
    const centre = {
      lat: this.client.latitude,
      lng: this.client.longitude,
      /*lat: 44.83089065551758,
      lng: -0.5729547739028931,*/
    };
    const zoomLevel = 14;
    this.map = L.map('map', {center: [centre.lat, centre.lng], zoom: zoomLevel});

    const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      minZoom: 2,
      maxZoom: 19
    });

    mainLayer.addTo(this.map);
    L.marker([centre.lat,centre.lng], {icon: this.hommeIcon}).addTo(this.map);
    /*L.Routing.control({
      geocoder: L.control.Geocoder.nominatim()
    }).addTo(this.map);
    L.Control.geocoder().addTo(this.map);*/


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
      //marker.bindTooltip('test');
    }
    else{
      const marker = L.marker([transport.latitude,transport.longitude], {icon: this.trotIcon});
      marker.addTo(this.map);
      marker.bindPopup('<h1>trot</h1>');

    }
  }

}
