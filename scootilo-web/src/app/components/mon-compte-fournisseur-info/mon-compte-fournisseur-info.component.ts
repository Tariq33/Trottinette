import { Component, OnInit } from '@angular/core';
import {Fournisseur} from '../../model/fournisseur';
import {SessionService} from '../../service/session.service';
import {AdministrateurService} from '../../service/administrateur.service';
import {FournisseurService} from '../../service/fournisseur.service';
import {Adresse} from "../../model/adresse";
import {AdresseService} from "../../service/adresse.service";

@Component({
  selector: 'app-mon-compte-fournisseur-info',
  templateUrl: './mon-compte-fournisseur-info.component.html',
  styleUrls: ['./mon-compte-fournisseur-info.component.scss']
})
export class MonCompteFournisseurInfoComponent implements OnInit {
  fournisseurForm: Fournisseur = new Fournisseur();
  adresses: Array<Adresse> = new Array<Adresse>();
  adresse : Adresse = new Adresse();

  load(){
    this.adresseService.FindAddressByUserId(this.sessionService.getClient().id).subscribe(resp => {
      this.adresse=resp[0];
    }, error => console.log(error));
  }

  constructor(private adresseService : AdresseService, private sessionService : SessionService, private fournisseurService: FournisseurService) {
    this.fournisseurForm=this.sessionService.getFournisseur();
    this.load();
  }

  ngOnInit(): void {
  }

}
