import { Component, OnInit } from '@angular/core';
import {Utilisateur} from '../../model/utilisateur';
import {MoyenDeTransportService} from '../../service/moyen-de-transport.service';
import {MoyenDeTransport} from '../../model/moyenDeTransport';
import {SessionService} from "../../service/session.service";
import {Fournisseur} from "../../model/fournisseur";
import {Observable} from "rxjs";
import {Adresse} from "../../model/adresse";

@Component({
  selector: 'app-mon-compte-administrateur-liste-moyen-transport',
  templateUrl: './mon-compte-administrateur-liste-moyen-transport.component.html',
  styleUrls: ['./mon-compte-administrateur-liste-moyen-transport.component.scss']
})
export class MonCompteAdministrateurListeMoyenTransportComponent implements OnInit {

  moyenDeTransportForm: MoyenDeTransport = null;
  fournisseur = new Fournisseur();
  listeFournisseur: Array<MoyenDeTransport> = new Array<MoyenDeTransport>();

  constructor(private moyenDeTransportService: MoyenDeTransportService, public sessionService: SessionService) {
    this.fournisseur = this.sessionService.getFournisseur();
    this.listFournisseur();
  }

  ngOnInit(): void {
  }

  list(): Array<MoyenDeTransport> {
    return this.moyenDeTransportService.findAll();
  }

  listFournisseur(){
    this.moyenDeTransportService.findAllByFournisseur(this.fournisseur.nom).subscribe(resp => {
      this.listeFournisseur = resp;
    }, error => console.log(error));

  }

  delete(id: number){
    this.moyenDeTransportService.deleteById(id).subscribe(resp => {
      this.listFournisseur();
    }, error => console.log(error));

  }





  edit(id: number) {
    this.moyenDeTransportService.findById(id).subscribe(resp => this.moyenDeTransportForm = resp, error => console.log(error));
  }

}
