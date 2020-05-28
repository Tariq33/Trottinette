import { Component, OnInit } from '@angular/core';
import {Client} from "../../model/client";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {ClientService} from "../../service/client.service";
import {Preference} from "../../model/Preference";

@Component({
  selector: 'app-mon-compte-client-maj-info',
  templateUrl: './mon-compte-client-maj-info.component.html',
  styleUrls: ['./mon-compte-client-maj-info.component.scss']
})
export class MonCompteClientMajInfoComponent implements OnInit {

  clientunique: Client = new Client();

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
