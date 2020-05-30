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
  public adresseMoyenDeTransport = {
    numeroRue: null,
    rue: null,
    ville: null,
  };
  public moyenTransport = new MoyenDeTransport();

  constructor(private geocodingService: GeocodingService, private sessionService: SessionService) {
    this.moyenTransport = this.getMoyenDeTransportReserver();
    this.geocodingService.getAddressWithGps(this.moyenTransport.latitude, this.moyenTransport.longitude).subscribe(resp => {
      this.adresseMoyenDeTransport = {
        numeroRue: resp.address.house_number,
        rue : resp.address.road,
        ville: resp.address.city,
      }
    })
  }

  getMoyenDeTransportReserver() {
    console.log(this.sessionService.getMoyenDeTransportReserve());
    return this.sessionService.getMoyenDeTransportReserve();
  }



  ngOnInit(): void {
  }



}
