import {Component, OnInit} from '@angular/core';
import {Client} from "../../model/client";
import {ClientService} from "../../service/client.service";
import {Adresse} from "../../model/adresse";
import {Reservation} from "../../model/Reservation";
import {Itineraire} from "../../model/itineraire";
import {SessionService} from "../../service/session.service";
import {AdresseService} from "../../service/adresse.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-mon-compte-client',
  templateUrl: './mon-compte-client.component.html',
  styleUrls: ['./mon-compte-client.component.scss']
})
export class MonCompteClientComponent implements OnInit {

  client: Client;
  adresses: Array<Adresse> = new Array<Adresse>();
  histo: Array<object> = new Array<object>();


  constructor(private adresseService : AdresseService, private sessionService : SessionService, private clientService: ClientService,private router: Router) {
    this.client=this.sessionService.getClient();
    this.load();

    clientService.FindHistorique(this.sessionService.getClient().id).subscribe(resp => {
      this.histo = resp;
      console.log(this.histo);
    }, error => console.log(error));

  }

  ngOnInit(): void {}


  delete(id:number){
    this.adresseService.deleteById(id).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }


  load(){
    this.adresseService.FindAddressByUserId(this.sessionService.getClient().id).subscribe(resp => {
      this.adresses =  resp;
    }, error => console.log(error));
  }

  arrayOne(n: number): any[] {

    let suite =Array.from(Array(n).keys())

    return suite;
  }

}
