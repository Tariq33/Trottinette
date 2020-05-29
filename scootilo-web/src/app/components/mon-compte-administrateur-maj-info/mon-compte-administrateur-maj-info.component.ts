import { Component, OnInit } from '@angular/core';
import {Administrateur} from '../../model/administrateur';
import {AdministrateurService} from '../../service/administrateur.service';
import {MoyenDeTransport} from '../../model/moyenDeTransport';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Client} from '../../model/client';
import {SessionService} from '../../service/session.service';
import {ClientService} from '../../service/client.service';

@Component({
  selector: 'app-mon-compte-administrateur-maj-info',
  templateUrl: './mon-compte-administrateur-maj-info.component.html',
  styleUrls: ['./mon-compte-administrateur-maj-info.component.scss']
})
export class MonCompteAdministrateurMajInfoComponent implements OnInit {

  administrateurForm: Administrateur = new Administrateur();

  constructor(private sessionService : SessionService, private administrateurService: AdministrateurService, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.administrateurForm=sessionService.getClient();
    console.log(this.administrateurForm);
  }

  ngOnInit(): void {
  }

  save() {
    this.administrateurService.modify(this.administrateurForm).subscribe(resp => {
      this.administrateurForm = new Administrateur();
      this.updateSessionStorage();
    }, error => console.log(error));

  }

  updateSessionStorage() {
    this.administrateurService.findById(JSON.parse(sessionStorage.getItem("utilisateur")).id).subscribe(resp => {
        this.sessionService.setUtilisateur(resp);
        this.router.navigateByUrl('/compteAdministrateur');
      },
      error => console.log(error)
    )
  }

  cancel() {
    this.administrateurForm = null;
  }

}
