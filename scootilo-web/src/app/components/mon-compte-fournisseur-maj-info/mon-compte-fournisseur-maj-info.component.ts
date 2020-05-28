import { Component, OnInit } from '@angular/core';
import {Fournisseur} from '../../model/fournisseur';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {FournisseurService} from '../../service/fournisseur.service';

@Component({
  selector: 'app-mon-compte-fournisseur-maj-info',
  templateUrl: './mon-compte-fournisseur-maj-info.component.html',
  styleUrls: ['./mon-compte-fournisseur-maj-info.component.scss']
})
export class MonCompteFournisseurMajInfoComponent implements OnInit {

  fournisseurForm: Fournisseur = new Fournisseur();

  constructor(private fournisseurService: FournisseurService, private http: HttpClient) { }

  ngOnInit(): void {
    console.log(sessionStorage.getItem("utilisateur"));
    this.fournisseurForm = JSON.parse(sessionStorage.getItem("utilisateur"));
    // this.fournisseurForm.nom = JSON.parse(sessionStorage.getItem("utilisateur")).nom;
    // this.fournisseurForm.numeroSiret = JSON.parse(sessionStorage.getItem("utilisateur")).numeroSiret;
    // this.fournisseurForm.numeroTva = JSON.parse(sessionStorage.getItem("utilisateur")).numeroTva;
    // this.fournisseurForm.iban = JSON.parse(sessionStorage.getItem("utilisateur")).iban;
    // this.fournisseurForm.bic = JSON.parse(sessionStorage.getItem("utilisateur")).bic;


  }

  save() {
    if (this.fournisseurForm.id) {
      this.fournisseurService.modify(this.fournisseurForm).subscribe(resp => {
        this.fournisseurForm = null;
        this.fournisseurService.load();
      }, error => console.log(error));
    }
  }

  cancel() {
    this.fournisseurForm = null;
  }
}
