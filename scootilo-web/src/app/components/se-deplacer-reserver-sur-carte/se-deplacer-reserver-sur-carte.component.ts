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
  moyenDeTransportChoisi: MoyenDeTransport = new MoyenDeTransport();
  adresseAndTempsDeMarcheTransportChoisi = {
    'adresse' : null,
    'tempsDeMarche' : null,
  };

  constructor(public cd: ChangeDetectorRef, private geocodingService: GeocodingService, private sessionService: SessionService) {
    this.moyenDeTransportChoisi = this.sessionService.getMoyenDeTransportReserve();
    this.adresseAndTempsDeMarcheTransportChoisi = this.sessionService.getAdresseAndTempsDeMarche();
  }

  ngOnInit(): void {
  }



}
