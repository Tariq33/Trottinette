import { Component, OnInit } from '@angular/core';
import {Client} from "../../model/client";
import {ClientService} from "../../service/client.service";
import {Adresse} from "../../model/adresse";
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
  histo: Array<object> = new Array<object>();


  constructor(private clientService: ClientService) {

    clientService.FindHistorique(323).subscribe(resp => {
      this.histo = resp;
      console.log(this.histo);
    }, error => console.log(error));

  }


  ngOnInit(): void {
    console.log(JSON.parse(sessionStorage.getItem("utilisateur")));
    this.clientunique.id = JSON.parse(sessionStorage.getItem("utilisateur")).id;
    this.clientunique.solde = JSON.parse(sessionStorage.getItem("utilisateur")).solde;
    this.clientunique.prenom = JSON.parse(sessionStorage.getItem("utilisateur")).prenom;
    this.clientunique.nom = JSON.parse(sessionStorage.getItem("utilisateur")).nom;
    this.clientunique.email = JSON.parse(sessionStorage.getItem("utilisateur")).email;
    this.clientunique.preference = JSON.parse(sessionStorage.getItem("utilisateur")).preference;

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
