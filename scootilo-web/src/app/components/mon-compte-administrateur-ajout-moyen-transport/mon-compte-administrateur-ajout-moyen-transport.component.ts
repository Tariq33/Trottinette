import { Component, OnInit } from '@angular/core';
import {MoyenDeTransport} from '../../model/moyenDeTransport';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {MoyenDeTransportService} from '../../service/moyen-de-transport.service';
import {FournisseurService} from '../../service/fournisseur.service';
import {Fournisseur} from '../../model/fournisseur';

@Component({
  selector: 'app-mon-compte-administrateur-ajout-moyen-transport',
  templateUrl: './mon-compte-administrateur-ajout-moyen-transport.component.html',
  styleUrls: ['./mon-compte-administrateur-ajout-moyen-transport.component.scss']
})
export class MonCompteAdministrateurAjoutMoyenTransportComponent implements OnInit {
  moyenDeTransportForm: MoyenDeTransport = new MoyenDeTransport();
  typeUser: string;
  nomFournisseurList : string = null;
  fournisseur: Fournisseur = new Fournisseur();
  fournisseurs: Array<Fournisseur> = new Array<Fournisseur>();

  constructor(private moyenDeTransportService: MoyenDeTransportService, private http: HttpClient, private route: ActivatedRoute, private fournisseurService: FournisseurService) {
    this.typeUser = JSON.parse(sessionStorage.getItem("utilisateur")).type;
    this.fournisseur = JSON.parse(sessionStorage.getItem("utilisateur"));
    this.fournisseurService.findAll().subscribe( resp => {
      this.fournisseurs = resp;
    });
  }

  // listFournisseur() : Array<Fournisseur> {
  //   return this.fournisseurService.load();
  // }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];

      if(!id) {
        this.moyenDeTransportForm = new MoyenDeTransport();
      } else {
        this.moyenDeTransportService.findById(id).subscribe(resp => this.moyenDeTransportForm = resp, error => console.log(error));
      }
    });
  }

  charger(nom:string) {
    for (let four of this.fournisseurs) {
      if (four.nom == nom) {
        this.moyenDeTransportForm.fournisseur = four;
        return;
      }
    }
  }

  save() {
      if(this.typeUser=="supplier") {
        this.moyenDeTransportForm.fournisseur = this.fournisseur;
      }
      this.moyenDeTransportService.create(this.moyenDeTransportForm).subscribe(resp => {
          this.moyenDeTransportForm = null;
          this.moyenDeTransportService.load();
        },
        error => console.log(error)
      )
  }

  cancel() {
    this.moyenDeTransportForm = null;
  }

}
