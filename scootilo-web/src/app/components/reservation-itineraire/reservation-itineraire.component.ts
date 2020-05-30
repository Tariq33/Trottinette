import { Component, OnInit } from '@angular/core';
import {SessionService} from '../../service/session.service';

@Component({
  selector: 'app-reservation-itineraire',
  templateUrl: './reservation-itineraire.component.html',
  styleUrls: ['./reservation-itineraire.component.scss']
})
export class ReservationItineraireComponent implements OnInit {

  constructor(private sessionService: SessionService) {
    console.log(this.sessionService.getMoyenDeTransportReserve())
  }

  ngOnInit(): void {
  }

  cancelClick() {
  this.sessionService.removeSessionStorageMoyenDeTransport();
}

}
