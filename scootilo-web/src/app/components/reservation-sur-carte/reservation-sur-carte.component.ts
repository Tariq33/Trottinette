import { Component, OnInit } from '@angular/core';
import {MoyenDeTransport} from '../../model/moyenDeTransport';
import {SessionService} from '../../service/session.service';
import {ReservationService} from '../../service/reservation.service';
import {Reservation} from '../../model/Reservation';
import {Client} from '../../model/client';
import {Router} from '@angular/router';
import {Itineraire} from '../../model/itineraire';
import {ItineraireService} from '../../service/itineraire.service';
import {AdresseItineraire} from "../../model/adresseItineraire";

@Component({
  selector: 'app-reservation-sur-carte',
  templateUrl: './reservation-sur-carte.component.html',
  styleUrls: ['./reservation-sur-carte.component.scss']
})
export class ReservationSurCarteComponent implements OnInit {
  reservationItineraire = null
  itineraire : Itineraire = new Itineraire();
  moyenDeTransportChoisi = new MoyenDeTransport();
  adresseAndTempsDeMarcheTransportChoisi = {
    'adresse' : null,
    'tempsDeMarche' : null,
  };

  reservation = new Reservation();
  client = new Client();

  constructor(private sessionService: SessionService, private reservationService: ReservationService, private router: Router, private itineraireService: ItineraireService) {
    this.moyenDeTransportChoisi = this.sessionService.getMoyenDeTransportReserve();
    this.adresseAndTempsDeMarcheTransportChoisi = this.sessionService.getAdresseAndTempsDeMarche();
      }

  ngOnInit(): void {
  }

  save() {
    //Renseigne la réservation
    this.reservation.adrDepart= new AdresseItineraire();
    console.log("on passe");
    // this.reservation.adrDepart.rue= this.reservationItineraire.numeroRue + " " + this.reservationItineraire.rue;
    // this.reservation.adrDepart.codePostal= "33000";
    this.reservation.adrDepart.complement = this.adresseAndTempsDeMarcheTransportChoisi.adresse;
    // this.reservation.adrDepart.ville= this.reservationItineraire.ville;
    // @ts-ignore
    this.reservation.date = new Date();
    // @ts-ignore
    this.reservation.heureDepart = new Date();
    this.reservation.client = this.sessionService.getClient();
    this.reservation.expiree = false;

    // Crée la réservation
    this.reservationService.create(this.reservation).subscribe(resp => {
        this.reservation=resp;
        this.sessionService.setReservation(this.reservation);

        this.itineraire.adrDepart= this.reservation.adrDepart
        // @ts-ignore
        this.itineraire.heureArrivee= new Date();
        this.itineraire.acompte=1;
        this.itineraire.reservation=this.reservation;
        // this.itineraire.moyenDeTransport = this.moyenDeTransportChoisi;
        console.log("ITINERAIRE :")
        console.log(this.itineraire);
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

  cancelClick() {
    this.sessionService.removeSessionStorageMoyenDeTransport();
  }


}
