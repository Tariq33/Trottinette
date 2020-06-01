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



  constructor(private sessionService: SessionService) {

  }

  ngOnInit(): void {
  }

  cancelClick() {
  this.sessionService.removeSessionStorageAdresseMoyenDeTransportReservee();
}

}
