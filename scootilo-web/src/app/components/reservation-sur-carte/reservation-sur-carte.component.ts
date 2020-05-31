import { Component, OnInit } from '@angular/core';
import {MoyenDeTransport} from '../../model/moyenDeTransport';
import {SessionService} from '../../service/session.service';
import {ReservationService} from '../../service/reservation.service';
import {Reservation} from '../../model/Reservation';
import {Client} from '../../model/client';
import {ClientService} from '../../service/client.service';
import {Router} from '@angular/router';
import {Itineraire} from '../../model/itineraire';
import {ItineraireService} from '../../service/itineraire.service';

@Component({
  selector: 'app-reservation-sur-carte',
  templateUrl: './reservation-sur-carte.component.html',
  styleUrls: ['./reservation-sur-carte.component.scss']
})
export class ReservationSurCarteComponent implements OnInit {
  reservationItineraire = {
    'moyendeTransportClick' : new MoyenDeTransport(),
    'numeroRue' : null,
    'rue' : null,
    'ville' : null,
    'tempsDeMarche' : null,
  };

  reservation = new Reservation();
  // @ts-ignore
  dateReservation: Date = new Date();
  client = new Client();
  itineraire = new Itineraire();

  constructor(private sessionService: SessionService, private reservationService: ReservationService, private router: Router, private itineraireService: ItineraireService) {
    this.reservationItineraire = this.sessionService.getAdresseMoyenDeTransportReservee();
      }

  ngOnInit(): void {
  }

  save() {
    //Attributs de la réservation
    this.reservation.date = this.dateReservation;
    this.reservation.heureDepart = this.dateReservation;
    this.reservation.client = this.sessionService.getClient();


    //Attribut de l'itinéraire
    // this.itineraire.moyenDeTransport = this.reservationItineraire.moyendeTransportClick;
    // this.itineraire.reservation = this.reservation;
    // console.log("ITINERAIRE :")
    // console.log(this.itineraire);

    // this.reservation.itineraires = [this.itineraire];

    //pour heureLimite
    // this.dateReservation.setMinutes(this.dateReservation.getMinutes() + 15);
    this.reservation.expiree = false;
    console.log(this.reservation);
    this.reservationService.create(this.reservation).subscribe(resp => {
      this.reservation.id = resp.id;
      console.log(resp.id);
      this.sessionService.setReservation(this.reservation);
        console.log("APRES LE SAVE");
        console.log(this.sessionService.getReservation());
        // this.createItineraire();
        this.router.navigateByUrl('/finDeTrajet/');

      },
      error => console.log(error)
    )

    // this.itineraireService.create(this.itineraire).subscribe(resp => {
    // console.log("itineraire sauvegardé")
    // })

  }

  cancelClick() {
    this.sessionService.removeSessionStorageMoyenDeTransport();
  }

  // createItineraire() {
  //   // this.itineraire.reservation = this.reservation;
  //   // this.itineraire.moyenDeTransport = this.reservationItineraire.moyendeTransportClick;
  //   this.itineraireService.create(this.itineraire).subscribe(resp => {
  //     this.itineraire.id = resp.id;
  //     this.sessionService.setItineraire(this.itineraire);
  //   })
  //   console.log(this.itineraire);
  // }

}
