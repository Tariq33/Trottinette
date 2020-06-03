import { Component, OnInit } from '@angular/core';
import {Itineraire} from "../../model/itineraire";
import {ActivatedRoute, Router} from "@angular/router";
import {SessionService} from "../../service/session.service";
import {FinDeTrajet} from "../../model/finDeTrajet";
import {FinDeTrajetService} from "../../service/fin-de-trajet.service";
import {ReservationService} from "../../service/reservation.service";
import {Reservation} from "../../model/Reservation";
import {AdresseService} from "../../service/adresse.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-finalisation',
  templateUrl: './finalisation.component.html',
  styleUrls: ['./finalisation.component.scss']
})
export class FinalisationComponent implements OnInit {

  itineraire : Itineraire;
  reservation : Reservation;
  final: FinDeTrajet = new FinDeTrajet();

  constructor(private router: Router, private sessionService: SessionService, private  finDeTrajetService: FinDeTrajetService, private  reservationService: ReservationService, private http: HttpClient, private route: ActivatedRoute) {
    // this.itineraire = sessionService.getItineraire();
    this.reservation = sessionService.getReservation();

  }

  ngOnInit(): void {
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

  save(){
    this.final.reservation=this.sessionService.getReservation();
    this.final.photo = this.imagePath[0].name;
    // console.log(this.imagePath);

      this.finDeTrajetService.create(this.final).subscribe(resp => {
        this.router.navigateByUrl('/accueil');
      }, error => console.log(error));

  }


}
