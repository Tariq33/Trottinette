import { Component, OnInit } from '@angular/core';
import {timer} from 'rxjs';
import {SessionService} from '../../service/session.service';
import {MoyenDeTransport} from '../../model/moyenDeTransport';
import * as L from 'leaflet';
import {ClientService} from '../../service/client.service';
import { Client } from 'src/app/model/client';
import {Reservation} from '../../model/Reservation';
import {Itineraire} from '../../model/itineraire';
import {ItineraireService} from '../../service/itineraire.service';

@Component({
  selector: 'app-fin-de-trajet',
  templateUrl: './fin-de-trajet.component.html',
  styleUrls: ['./fin-de-trajet.component.scss']
})
export class FinDeTrajetComponent implements OnInit {
  public map;
  public prixSeconde;
  public time: number = 0;
  public cout;
  public timerDisplay = {
    minutes: {digit1: "0", digit2: "0"},
    seconds: {digit1: "0", digit2: "0"}
  };
  public client: Client = new Client();
  public reservation: Reservation = new Reservation();
  reservationItineraire = {
    'moyendeTransportClick': new MoyenDeTransport(),
    'numeroRue': null,
    'rue': null,
    'ville': null,
    'tempsDeMarche': null,
  };
  public itineraireRes = new Itineraire();

  ngOnInit(): void {
  }


  constructor(private sessionService: SessionService, private itineraireService: ItineraireService) {
    this.reservationItineraire = this.sessionService.getAdresseMoyenDeTransportReservee();
    this.reservation = this.sessionService.getReservation();
    this.itineraireRes.moyenDeTransport = this.reservationItineraire.moyendeTransportClick;
    this.itineraireRes.reservation = this.reservation;
    this.createItineraire();
    console.log(this.itineraireRes);
    this.prixSeconde = this.reservationItineraire.moyendeTransportClick.prixMinute / 60;
    timer(0, 1000).subscribe(ellapsedCycles => {
      this.time++;
      this.timerDisplay = this.getDisplayTimer(this.time);
      this.cout = (this.prixSeconde * this.time).toFixed(2);
    });


  }
  createItineraire() {
    this.itineraireService.create(this.itineraireRes).subscribe(resp => {
      this.itineraireRes.id = resp.id;
      this.sessionService.setItineraire(this.itineraireRes);
    })
  }

  getDisplayTimer(time: number) {
    // const hours = '0' + Math.floor(time / 3600);
    const minutes = '0' + Math.floor(time % 3600 / 60);
    const seconds = '0' + Math.floor(time % 3600 % 60);

    return {
      // hours: { digit1: hours.slice(-2, -1), digit2: hours.slice(-1) },
      minutes: {digit1: minutes.slice(-2, -1), digit2: minutes.slice(-1)},
      seconds: {digit1: seconds.slice(-2, -1), digit2: seconds.slice(-1)},
    };
  }

}

