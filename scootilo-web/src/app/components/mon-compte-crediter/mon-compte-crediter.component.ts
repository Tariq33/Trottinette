import { Component, OnInit } from '@angular/core';
import {Client} from "../../model/client";
import {ClientService} from "../../service/client.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from '@angular/router';
import {SessionService} from '../../service/session.service';

@Component({
  selector: 'app-mon-compte-crediter',
  templateUrl: './mon-compte-crediter.component.html',
  styleUrls: ['./mon-compte-crediter.component.scss']
})
export class MonCompteCrediterComponent implements OnInit {

  clientunique: Client = new Client();
  ajoutsolde: number = 0;
  soldefinal:number = 0;

  constructor(private clientService: ClientService, private http: HttpClient, private route: ActivatedRoute, private sessionService: SessionService, private router: Router) {
  this.clientunique=this.sessionService.getClient();
  }

  ngOnInit(): void {
  }

  save() {
    this.soldefinal = (+this.clientunique.solde) + (+this.ajoutsolde);
    this.clientunique.solde = this.soldefinal;
    this.clientService.modify(this.clientunique).subscribe(resp => {
      this.clientunique = new Client();
      this.updateSessionStorage();
    }, error => console.log(error));
  }

  updateSessionStorage() {
    this.clientService.findById(JSON.parse(sessionStorage.getItem("utilisateur")).id).subscribe(resp => {
        this.sessionService.setUtilisateur(resp);
        this.router.navigateByUrl('/compteClient');
      },
      error => console.log(error)
    )
  }

  cancel() {
    this.clientunique = null;
  }
}
