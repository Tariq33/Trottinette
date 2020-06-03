import { Component, OnInit } from '@angular/core';
import {SessionService} from '../../service/session.service';
import {MoyenDeTransport} from '../../model/moyenDeTransport';
import {Reservation} from '../../model/Reservation';
import {AdresseItineraire} from '../../model/adresseItineraire';
import {ReservationService} from '../../service/reservation.service';
import {Itineraire} from '../../model/itineraire';
import {ItineraireService} from '../../service/itineraire.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reservation-itineraire',
  templateUrl: './reservation-itineraire.component.html',
  styleUrls: ['./reservation-itineraire.component.scss']
})
export class ReservationItineraireComponent implements OnInit {
  moyenDeTransportChoisi: MoyenDeTransport = new MoyenDeTransport();
  adresseAndTempsDeMarcheTransportChoisi = {
    'adresse' : null,
    'tempsDeMarche' : null,
    'dureeEstime' : null,
    'prixEstimatif' : null,
  };
  reservation: Reservation = new Reservation();
  itineraire: Itineraire = new Itineraire();


  constructor(private sessionService: SessionService, private reservationService: ReservationService, private itineraireService: ItineraireService, private router: Router) {
  this.moyenDeTransportChoisi = this.sessionService.getMoyenDeTransportReserve();
  this.adresseAndTempsDeMarcheTransportChoisi = this.sessionService.getAdresseAndTempsDeMarche();

  }

  save() {
    //Renseigne la réservation
    this.reservation.adrDepart= new AdresseItineraire();
    this.reservation.adrArrivee= new AdresseItineraire();
    console.log("on passe");
    // this.reservation.adrDepart.rue= this.reservationItineraire.numeroRue + " " + this.reservationItineraire.rue;
    // this.reservation.adrDepart.codePostal= "33000";

    let adresse = this.adresseAndTempsDeMarcheTransportChoisi.adresse;
    this.reservation.adrDepart.rue = adresse.slice(0,adresse.indexOf("Bordeaux")-2);
    this.reservation.adrDepart.ville="Bordeaux";
    this.reservation.adrDepart.codePostal="33000";

    this.reservation.adrArrivee.ville="Bordeaux";
    this.reservation.adrArrivee.codePostal="33000";

    this.reservation.date = new Date();
    this.reservation.heureDepart = new Date();
    this.reservation.client = this.sessionService.getClient();
    this.reservation.expiree = false;
    console.log("la résa : ");
    console.log(this.reservation);

    // Crée la réservation
    this.reservationService.create(this.reservation).subscribe(resp => {
        this.reservation=resp;
        this.sessionService.setReservation(this.reservation);

        this.itineraire.adrDepart= this.reservation.adrDepart;
        this.itineraire.heureArrivee= new Date();
        this.itineraire.acompte=1;
        this.itineraire.reservation=this.reservation;

        this.itineraireService.create(this.itineraire).subscribe(resp => {
            //renseigner le itineraireSession
            this.itineraire=resp;
            this.sessionService.setItineraire(this.itineraire);
            this.router.navigateByUrl('/finDeTrajet/');
          },
          error => console.log(error)
        )
      },
      error => console.log(error)
    )
  }

  ngOnInit(): void {
  }

  cancelClick() {
  this.sessionService.removeSessionStorageAdresseMoyenDeTransportReservee();
}

}
