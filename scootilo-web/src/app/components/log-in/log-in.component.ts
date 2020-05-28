import { Component, OnInit } from '@angular/core';
import {Client} from "../../model/client";
import {ClientService} from "../../service/client.service";
import {Router} from "@angular/router";
import {UtilisateurService} from "../../service/utilisateur.service";
import {Utilisateur} from "../../model/utilisateur";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  identifiant:string;
  motDePasse:string;

  constructor(private utilisateurService : UtilisateurService, private router: Router) { }

  ngOnInit(): void {
  }

  checkUser () {
    console.log("checkUser lancée");
    this.utilisateurService.findByIdentifiantAndMotDePasse(this.identifiant, this.motDePasse).subscribe(resp => {
      sessionStorage.setItem("utilisateur",JSON.stringify(resp));
      this.router.navigateByUrl('/accueil');
      },
      error => console.log(error)
    );
  }
}
