import { Component, OnInit } from '@angular/core';
import {MoyenDeTransport} from "../../model/moyenDeTransport";
import {MoyenDeTransportService} from "../../service/moyen-de-transport.service";

@Component({
  selector: 'app-se-deplacer-tarif',
  templateUrl: './se-deplacer-tarif.component.html',
  styleUrls: ['./se-deplacer-tarif.component.scss']
})
export class SeDeplacerTarifComponent implements OnInit {

  constructor(private moyenDeTransportService: MoyenDeTransportService) { }

  ngOnInit(): void {
  }

  list(): Array<MoyenDeTransport> {
    return this.moyenDeTransportService.findAll();
  }

}
