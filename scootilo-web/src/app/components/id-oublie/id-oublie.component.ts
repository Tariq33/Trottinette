import { Component, OnInit } from '@angular/core';
import {SessionService} from "../../service/session.service";
import {ClientService} from "../../service/client.service";
import {Router} from "@angular/router";
import {Client} from "../../model/client";

@Component({
  selector: 'app-id-oublie',
  templateUrl: './id-oublie.component.html',
  styleUrls: ['./id-oublie.component.scss']
})
export class IdOublieComponent implements OnInit {

  client: Client;
  condition: boolean;
  email_tapez: string;
  mail: string;
  listeEmail: Array<string> = new Array<string>();

  constructor(private sessionService : SessionService, private clientService: ClientService,private router: Router) {
    // this.client=this.sessionService.getClient();

    clientService.FindAllMail().subscribe(resp => {
      this.listeEmail = resp;
    }, error => console.log(error));

  }

  ngOnInit(): void {
  }

  verification(){
    for(this.mail of this.listeEmail) {

      if (this.mail[0] != this.email_tapez) {
        this.condition = false;
      } else {
        this.condition = true;
      }
    }
  }

}
