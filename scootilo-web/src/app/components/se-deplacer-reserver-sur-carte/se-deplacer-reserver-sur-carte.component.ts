import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {MoyenDeTransport} from '../../model/moyenDeTransport';
import {SessionService} from '../../service/session.service';
import {GeocodingService} from '../../service/geocoding.service';

@Component({
  selector: 'app-se-deplacer-reserver-sur-carte',
  templateUrl: './se-deplacer-reserver-sur-carte.component.html',
  styleUrls: ['./se-deplacer-reserver-sur-carte.component.scss']
})
export class SeDeplacerReserverSurCarteComponent implements OnInit {
  // @Input() moyenTransport: MoyenDeTransport;
  reservationItineraire = {
    'moyendeTransportClick' : new MoyenDeTransport(),
    'numeroRue' : null,
    'rue' : null,
    'ville' : null,
    'tempsDeMarche' : null,
  };

  constructor(public cd: ChangeDetectorRef, private geocodingService: GeocodingService, private sessionService: SessionService) {
    this.reservationItineraire = this.sessionService.getAdresseMoyenDeTransportReservee();
    console.log(this.reservationItineraire);
  }

  ngOnInit(): void {
  }



}
