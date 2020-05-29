import { Component, OnInit } from '@angular/core';
import {Fournisseur} from '../../model/fournisseur';
import { Client } from 'src/app/model/client';
import {MoyenDeTransportService} from '../../service/moyen-de-transport.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {FournisseurService} from '../../service/fournisseur.service';
import {ClientService} from '../../service/client.service';
import { Adresse } from 'src/app/model/adresse';
import {AdresseService} from "../../service/adresse.service";
import {SessionService} from "../../service/session.service";

@Component({
  selector: 'app-mon-compte-ajout-adresse',
  templateUrl: './mon-compte-ajout-adresse.component.html',
  styleUrls: ['./mon-compte-ajout-adresse.component.scss']
})
export class MonCompteAjoutAdresseComponent implements OnInit {

  idAdr: number;
  adresse : Adresse = new Adresse();

  constructor(private router: Router, private sessionService : SessionService,private adresseService: AdresseService, private http: HttpClient, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.idAdr = params['id'];
    });
    this.load();
  }

  ngOnInit(): void {

    }

  load(){
    this.adresseService.findById(this.idAdr).subscribe(resp => {
      this.adresse =  resp;
    }, error => console.log(error));
  }

  save(){
    this.adresse.utilisateur=this.sessionService.getClient();
    this.adresseService.modify(this.adresse).subscribe(resp => {
      this.adresseService.load();
      this.router.navigateByUrl('/compteClient');
    }, error => console.log(error));
  }


  cancel(){
    this.router.navigateByUrl('/compteClient');
  }

}
