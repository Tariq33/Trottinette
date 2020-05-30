import {Component, Input, OnInit} from '@angular/core';
import {MoyenDeTransport} from '../../model/moyenDeTransport';
import {SessionService} from '../../service/session.service';

@Component({
  selector: 'app-se-deplacer-reserver-sur-carte',
  templateUrl: './se-deplacer-reserver-sur-carte.component.html',
  styleUrls: ['./se-deplacer-reserver-sur-carte.component.scss']
})
export class SeDeplacerReserverSurCarteComponent implements OnInit {

  @Input() moyenTransport: MoyenDeTransport;

  constructor() {}

  ngOnInit(): void {
  }



}
