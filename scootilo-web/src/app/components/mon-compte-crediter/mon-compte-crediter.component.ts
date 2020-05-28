import { Component, OnInit } from '@angular/core';
import {Client} from "../../model/client";
import {ClientService} from "../../service/client.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-mon-compte-crediter',
  templateUrl: './mon-compte-crediter.component.html',
  styleUrls: ['./mon-compte-crediter.component.scss']
})
export class MonCompteCrediterComponent implements OnInit {

  clientunique: Client;

  constructor(private clientService: ClientService, private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];

      this.clientService.findById(id).subscribe(resp => this.clientunique = resp, error => console.log(error));

    })
  }



  save() {
    if (!this.clientunique.id) {
      this.clientService.create(this.clientunique).subscribe(resp => {
          this.clientunique = null;
          this.clientService.load();
        },
        error => console.log(error)
      )

    } else {
      this.clientService.modify(this.clientunique).subscribe(resp => {
        this.clientunique = null;
        this.clientService.load();
      }, error => console.log(error));
    }
  }

  cancel() {
    this.clientunique = null;
  }
}
