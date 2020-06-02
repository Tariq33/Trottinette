import { Component, OnInit } from '@angular/core';
import {Itineraire} from "../../model/itineraire";
import {Router} from "@angular/router";
import {SessionService} from "../../service/session.service";
import {Client} from "../../model/client";
import {FinDeTrajet} from "../../model/finDeTrajet";
import {FinDeTrajetService} from "../../service/fin-de-trajet.service";

@Component({
  selector: 'app-finalisation',
  templateUrl: './finalisation.component.html',
  styleUrls: ['./finalisation.component.scss']
})
export class FinalisationComponent implements OnInit {

  itineraire : Itineraire;
  final: FinDeTrajet = new FinDeTrajet();

  constructor(private router: Router, private sessionService: SessionService, private  finDeTrajetService: FinDeTrajetService) {
    this.itineraire = sessionService.getItineraire();
  }

  ngOnInit(): void {
  }


  creationFinDeTrajet(){

    // Creer l'item fin de trajet  et l'associer à la réservation
  }

  imagePath;
  imgURL: any;

  preview(files) {
    if (files.length === 0) {
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  save() {
    this.finDeTrajetService.modify(this.final).subscribe(resp => {
      this.updateSessionStorage();
    }, error => console.log(error));

  }

  updateSessionStorage() {
    this.finDeTrajetService.findById(JSON.parse(sessionStorage.getItem("utilisateur")).id).subscribe(resp => {

        this.router.navigateByUrl('/accueil');
      },
      error => console.log(error)
    )
  }




}
