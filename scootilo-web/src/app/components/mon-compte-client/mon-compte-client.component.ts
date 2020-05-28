import {Component, OnInit} from '@angular/core';
import {Client} from "../../model/client";
import {ClientService} from "../../service/client.service";
import {Adresse} from "../../model/adresse";
import {Reservation} from "../../model/Reservation";
import {Itineraire} from "../../model/itineraire";
import {SessionService} from "../../service/session.service";

@Component({
  selector: 'app-mon-compte-client',
  templateUrl: './mon-compte-client.component.html',
  styleUrls: ['./mon-compte-client.component.scss']
})
export class MonCompteClientComponent implements OnInit {

  clientunique: Client;
  adresse: Adresse = new Adresse();
  reservation: Reservation = new Reservation();
  itineraire: Itineraire = new Itineraire();
  histo: Array<object> = new Array<object>();


  constructor(private sessionService : SessionService, private clientService: ClientService) {
    this.clientunique=this.sessionService.getClient();

    // clientService.FindHistorique(323).subscribe(resp => {
    //   this.histo = resp;
    //   console.log(this.histo);
    // }, error => console.log(error));

  }


  ngOnInit(): void {

  }

  edit(id: number) {
    this.clientService.findById(id).subscribe(resp => {
        this.clientunique = resp;
        this.clientService.load();
      },
      error => console.log(error)
    )
  }

}
