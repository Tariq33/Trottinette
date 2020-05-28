import { Component, OnInit } from '@angular/core';
import {Client} from "../../model/client";
import {ClientService} from "../../service/client.service";


@Component({
  selector: 'app-mon-compte-client-maj-info',
  templateUrl: './mon-compte-client-maj-info.component.html',
  styleUrls: ['./mon-compte-client-maj-info.component.scss']
})
export class MonCompteClientMajInfoComponent implements OnInit {

  clientunique: Client = new Client();

  constructor(private clientService: ClientService) {
  }

  ngOnInit(): void {
    let id = JSON.parse(sessionStorage.getItem("utilisateur")).id;
    this.clientService.findById(id).subscribe(resp => this.clientunique = resp, error => console.log(error));

  }

  edit(id: number) {
    console.log(this.clientunique)
    this.clientService.modify(this.clientunique).subscribe(resp => {
        this.clientunique = resp;
        this.clientService.load();
      },
      error => console.log(error)
    )
  }

  cancel() {
    this.clientunique = null;
  }
}
