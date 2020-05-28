import { Component, OnInit } from '@angular/core';
import {Client} from "../../model/client";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from '@angular/router';
import {ClientService} from "../../service/client.service";
import {Preference} from "../../model/Preference";

@Component({
  selector: 'app-mon-compte-client-maj-info',
  templateUrl: './mon-compte-client-maj-info.component.html',
  styleUrls: ['./mon-compte-client-maj-info.component.scss']
})
export class MonCompteClientMajInfoComponent implements OnInit {

  clientunique: Client;

  constructor(private clientService: ClientService, private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      let id = params['id'];
      console.log(id);
      this.clientService.findById(id).subscribe(resp => {this.clientunique = resp; }, error => console.log(error));


    })
  }

  save() {
    console.log(this.clientunique);
    if (this.clientunique.id) {
      this.clientService.modify(this.clientunique).subscribe(resp => {
        this.clientunique = null;
        this.updateSessionStorage();
        this.router.navigateByUrl('/compteClient')
      }, error => console.log(error));
    };
  }

  updateSessionStorage() {
    this.clientService.findById(this.clientunique.id).subscribe(resp => {
        sessionStorage.setItem("utilisateur",JSON.stringify(resp));

      },
      error => console.log(error)
    );
  }

  cancel() {
    this.clientunique = null;
  }
}
