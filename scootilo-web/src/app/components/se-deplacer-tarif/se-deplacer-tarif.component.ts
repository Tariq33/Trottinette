import { Component, OnInit } from '@angular/core';
import {MoyenDeTransport} from "../../model/moyenDeTransport";
import {MoyenDeTransportService} from "../../service/moyen-de-transport.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-se-deplacer-tarif',
  templateUrl: './se-deplacer-tarif.component.html',
  styleUrls: ['./se-deplacer-tarif.component.scss']
})
export class SeDeplacerTarifComponent implements OnInit {

  result: Array<object> = new Array<object>();

  constructor(private moyenDeTransportService: MoyenDeTransportService) {

    moyenDeTransportService.FindAllPerso().subscribe(resp => {
      this.result = resp;
      console.log(this.result);
    }, error => console.log(error));

  }

  ngOnInit(): void {
  }

  list(): Array<MoyenDeTransport> {
    return this.moyenDeTransportService.findAll();
  }


  arrayOne(n: number): any[] {

   let suite =Array.from(Array(n).keys())

    return suite;
  }





}


