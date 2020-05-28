import { Component, OnInit } from '@angular/core';
import {Client} from "../../model/client";
import {ClientService} from "../../service/client.service";
import {Adresse} from "../../model/adresse";
import {Preference} from "../../model/Preference";
import {Reservation} from "../../model/Reservation";
import {Itineraire} from "../../model/itineraire";

@Component({
  selector: 'app-mon-compte-client',
  templateUrl: './mon-compte-client.component.html',
  styleUrls: ['./mon-compte-client.component.scss']
})
export class MonCompteClientComponent implements OnInit {

  clientunique: Client = new Client();
  adresse :Adresse = new Adresse();
  reservation: Reservation = new Reservation();
  itineraire: Itineraire = new Itineraire();
  histo: Array<object>;


  constructor(private clientService: ClientService) {

    this.clientService.findById(323).subscribe(resp => {
      this.clientunique = resp;
    }, error => console.log(error));

    clientService.FindHistorique(323).subscribe(resp => {
      this.histo = resp;
      console.log(this.histo);
    }, error => console.log(error));

  }


  ngOnInit(): void {  }


}
