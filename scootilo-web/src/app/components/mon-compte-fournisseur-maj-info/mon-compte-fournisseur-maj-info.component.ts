import { Component, OnInit } from '@angular/core';
import {Fournisseur} from '../../model/fournisseur';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {FournisseurService} from '../../service/fournisseur.service';
import {SessionService} from '../../service/session.service';
import {Adresse} from "../../model/adresse";
import {AdresseService} from "../../service/adresse.service";

@Component({
  selector: 'app-mon-compte-fournisseur-maj-info',
  templateUrl: './mon-compte-fournisseur-maj-info.component.html',
  styleUrls: ['./mon-compte-fournisseur-maj-info.component.scss']
})
export class MonCompteFournisseurMajInfoComponent implements OnInit {

  fournisseurForm: Fournisseur = new Fournisseur();
  adresse : Adresse=new Adresse();
  idAdr : number;

  constructor(private adresseService : AdresseService, private sessionService : SessionService, private fournisseurService: FournisseurService, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      this.idAdr = params['id'];
    });
  console.log("on est dans la maj info");
    this.load();

    this.fournisseurForm=sessionService.getFournisseur();
  }

  load(){
    this.adresseService.findById(this.idAdr).subscribe(resp => {
      this.adresse =  resp;
    }, error => console.log(error));
  }

  ngOnInit(): void {
  }

  save() {
    this.fournisseurService.modify(this.fournisseurForm).subscribe(resp => {
      this.fournisseurForm = new Fournisseur();
      this.updateSessionStorage();
    }, error => console.log(error));

  }

  updateSessionStorage() {
    this.fournisseurService.findById(JSON.parse(sessionStorage.getItem("utilisateur")).id).subscribe(resp => {
        this.sessionService.setUtilisateur(resp);
        this.router.navigateByUrl('/compteFournisseur');
      },
      error => console.log(error)
    )
  }
}
