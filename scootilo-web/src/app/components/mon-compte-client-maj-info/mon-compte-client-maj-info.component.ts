import { Component, OnInit } from '@angular/core';
import {Client} from "../../model/client";
import {ClientService} from "../../service/client.service";
import {SessionService} from "../../service/session.service";
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-mon-compte-client-maj-info',
  templateUrl: './mon-compte-client-maj-info.component.html',
  styleUrls: ['./mon-compte-client-maj-info.component.scss']
})
export class MonCompteClientMajInfoComponent implements OnInit {

  clientunique: Client = new Client();

  constructor(private sessionService : SessionService, private clientService: ClientService, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.clientunique=JSON.parse(sessionStorage.getItem("utilisateur"));
  }

  ngOnInit(): void {
  }

  save() {
      this.clientService.modify(this.clientunique).subscribe(resp => {
        this.clientunique = null;
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
