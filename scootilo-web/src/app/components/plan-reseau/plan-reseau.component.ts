import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {MoyenDeTransport} from "../../model/moyenDeTransport";
import {MoyenDeTransportService} from "../../service/moyen-de-transport.service";


@Component({
  selector: 'app-plan-reseau',
  templateUrl: './plan-reseau.component.html',
  styleUrls: ['./plan-reseau.component.scss']
})
//export class PlanReseauComponent implements AfterViewInit {
export class PlanReseauComponent implements OnInit {
  map;
  moyensDeTransportObs: Array<MoyenDeTransport> = new Array<MoyenDeTransport>();

  veloIcon = new L.Icon({
    iconUrl: '../../../assets/icon-velo.png'
  });

  scootIcon = new L.Icon({
    iconUrl: '../../../assets/icon-scoot.png'
  });

  trotIcon = new L.Icon({
    iconUrl: '../../../assets/icon-trot.png'
  });

  constructor(private moyenDeTransportService: MoyenDeTransportService) { }

  /*ngAfterViewInit(): void {
    this.createMap();
  }*/

  ngOnInit(): void {
    this.moyenDeTransportService.findAllMoyObs().subscribe(resp => {this.moyensDeTransportObs = resp; this.createMap(); } ,err => console.log(err))
  }

  createMap(){
    const centre = {
      lat: 44.83089065551758,
      lng: -0.5729547739028931,
    };
    const zoomLevel = 14;
    this.map = L.map('map', {center: [centre.lat, centre.lng], zoom: zoomLevel});

    const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      minZoom: 2,
      maxZoom: 19
    });

    mainLayer.addTo(this.map);

    for (let moy of this.moyensDeTransportObs ){
      this.addMarker(moy.latitude,moy.longitude,moy.typeDeTransport);
    }

  }
  //addMarker(coords){
  addMarker(latitude, longitude, type){
    //const marker = L.marker([coords.lat,coords.lng], {icon: this.smallIcon});
    if(type=="velo"){
      const marker = L.marker([latitude,longitude], {icon: this.veloIcon});
      marker.addTo(this.map);
    }
    else if(type=="scooter"){
      const marker = L.marker([latitude,longitude], {icon: this.scootIcon});
      marker.addTo(this.map);
    }
    else{
      const marker = L.marker([latitude,longitude], {icon: this.trotIcon});
      marker.addTo(this.map);
    }
  }

}
