import { Component, OnInit } from '@angular/core';
import {Fournisseur} from '../../model/fournisseur';
import { Client } from 'src/app/model/client';
import {MoyenDeTransportService} from '../../service/moyen-de-transport.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {FournisseurService} from '../../service/fournisseur.service';
import {ClientService} from '../../service/client.service';
import { Adresse } from 'src/app/model/adresse';

@Component({
  selector: 'app-mon-compte-ajout-adresse',
  templateUrl: './mon-compte-ajout-adresse.component.html',
  styleUrls: ['./mon-compte-ajout-adresse.component.scss']
})
export class MonCompteAjoutAdresseComponent implements OnInit {

fournisseurForm: Fournisseur = new Fournisseur();
clientForm: Client = new Client();

  constructor(private fournisseurService: FournisseurService, private clientService: ClientService, private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
  this.fournisseurForm.adresse = new Adresse();
    console.log(sessionStorage.getItem("utilisateur"));
    this.fournisseurForm = JSON.parse(sessionStorage.getItem("utilisateur"));
    if(!this.fournisseurForm.adresse)
    this.fournisseurForm.adresse = new Adresse();
    }




  getType():string{
    if(sessionStorage.getItem("utilisateur")!="") return JSON.parse(sessionStorage.getItem("utilisateur")).type;
    else return "";
  }


  saveFournisseur() {
    console.log(this.fournisseurForm)
    if (this.fournisseurForm.id) {
      this.fournisseurService.modify(this.fournisseurForm).subscribe(resp => {
          this.fournisseurForm.adresse = null;
          this.fournisseurService.load();
        },
        error => console.log(error)
      )
    }
  }

  saveClient() {
    if (!this.clientForm.id) {
      this.clientService.create(this.clientForm).subscribe(resp => {
          this.clientForm = null;
          this.clientService.load();
        },
        error => console.log(error)
      )
    }
  }

  cancelFournisseur() {
    this.fournisseurForm = null;
  }
  cancelClient() {
    this.clientForm = null;
  }

}
