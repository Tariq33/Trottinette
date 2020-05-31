import { Component, OnInit } from '@angular/core';
import {SessionService} from '../../service/session.service';
import {MoyenDeTransport} from '../../model/moyenDeTransport';
import {Reservation} from '../../model/Reservation';

@Component({
  selector: 'app-reservation-itineraire',
  templateUrl: './reservation-itineraire.component.html',
  styleUrls: ['./reservation-itineraire.component.scss']
})
export class ReservationItineraireComponent implements OnInit {

  reservationItineraire = {
    'moyendeTransportClick' : new MoyenDeTransport(),
    'numeroRue' : null,
    'rue' : null,
    'ville' : null,
    'tempsDeMarche' : null,
  };

  reservation = new Reservation();

  constructor(private sessionService: SessionService) {
    this.reservationItineraire = this.sessionService.getAdresseMoyenDeTransportReservee()
  }

  ngOnInit(): void {
  }

  cancelClick() {
  this.sessionService.removeSessionStorageAdresseMoyenDeTransportReservee();
}

}
