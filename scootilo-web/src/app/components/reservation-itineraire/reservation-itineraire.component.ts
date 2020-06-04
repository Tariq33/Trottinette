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
  reservation: Reservation = new Reservation();
  itineraire: Itineraire = new Itineraire();
  adresseAndTempsDeMarcheTransportChoisi = {
    'adresse' : null,
    'tempsDeMarche' : null,
    'dureeEstime' : null,
    'prixEstimatif' : null,
    'reservationSurCarte' : null,
    'reservationItineraire' : null,
  };


  constructor(private sessionService: SessionService, private reservationService: ReservationService, private itineraireService: ItineraireService, private router: Router) {
  this.moyenDeTransportChoisi = this.sessionService.getMoyenDeTransportReserve();
  this.adresseAndTempsDeMarcheTransportChoisi = this.sessionService.getAdresseAndTempsDeMarche();
  window.scrollBy(0,0);
  }

  save() {
    //Renseigne la réservation
    this.reservation.date = new Date();
    this.reservation.heureDepart = new Date();
    this.reservation.client = this.sessionService.getClient();
    this.reservation.expiree = false;
    this.reservation.montantEstime=this.adresseAndTempsDeMarcheTransportChoisi.prixEstimatif;

    // Crée la réservation
    this.reservationService.create(this.reservation).subscribe(resp => {
        this.reservation=resp;
        this.sessionService.setReservation(this.reservation);
        this.itineraire.dureeEstimee=this.adresseAndTempsDeMarcheTransportChoisi.dureeEstime;
        this.itineraire.adrDepart= this.reservation.adrDepart;
        this.itineraire.heureDepart= new Date();
        this.itineraire.heureLimite=new Date(new Date().getTime() + (10+this.adresseAndTempsDeMarcheTransportChoisi.tempsDeMarche)*60000);
        this.itineraire.acompte=1;
        this.itineraire.reservation=this.reservation;
        this.itineraireService.create(this.itineraire).subscribe(resp => {
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
