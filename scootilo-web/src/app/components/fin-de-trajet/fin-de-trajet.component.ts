import { Component, OnInit } from '@angular/core';
import {timer} from 'rxjs';
import {SessionService} from '../../service/session.service';
import {MoyenDeTransport} from '../../model/moyenDeTransport';
import * as L from 'leaflet';
import {ClientService} from '../../service/client.service';
import { Client } from 'src/app/model/client';
import {Reservation} from '../../model/Reservation';
import {Itineraire} from '../../model/itineraire';
import {ItineraireService} from '../../service/itineraire.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-fin-de-trajet',
  templateUrl: './fin-de-trajet.component.html',
  styleUrls: ['./fin-de-trajet.component.scss']
})
export class FinDeTrajetComponent implements OnInit {

  public prixSeconde;
  public time: number = 0;
  public cout;
  public timerDisplay = {
    minutes: {digit1: "0", digit2: "0"},
    seconds: {digit1: "0", digit2: "0"}
  };
  public client: Client = new Client();
  public reservation: Reservation = new Reservation();
  public reservationItineraire = null;
  public itineraire = new Itineraire();

  public validationDuMoyenDeTransport : boolean;
  public qrCodeInput : string;

  ngOnInit(): void {
  }


  constructor(private router: Router, private sessionService: SessionService, private itineraireService: ItineraireService) {
    this.reservationItineraire = this.sessionService.getAdresseMoyenDeTransportReservee();


  }

  getDisplayTimer(time: number) {
    // const hours = '0' + Math.floor(time / 3600);
    const minutes = '0' + Math.floor(time % 3600 / 60);
    const seconds = '0' + Math.floor(time % 3600 % 60);

    return {
      // hours: { digit1: hours.slice(-2, -1), digit2: hours.slice(-1) },
      minutes: {digit1: minutes.slice(-2, -1), digit2: minutes.slice(-1)},
      seconds: {digit1: seconds.slice(-2, -1), digit2: seconds.slice(-1)},
    };
  }

  finDuTrajet(){
    this.itineraire=this.sessionService.getItineraire();
    this.itineraire.montant=this.cout;
    this.itineraire.duree=this.time;
    this.sessionService.setItineraire(this.itineraire);

    // creer paiement fournisseur ici et l'associer à l'itinéraire


    this.router.navigateByUrl('/finalisation');
  }

  validationDuQrCode(qrCodeRenseigne : string){
    if(qrCodeRenseigne==this.reservationItineraire.moyendeTransportClick.qrCode){
      this.validationDuMoyenDeTransport=true;

      //On lance le timer et le compteur de prix
      this.prixSeconde = this.reservationItineraire.moyendeTransportClick.prixMinute / 60;
      timer(0, 1000).subscribe(ellapsedCycles => {
        this.time++;
        this.timerDisplay = this.getDisplayTimer(this.time);
        this.cout = (this.prixSeconde * this.time).toFixed(2);
      });
    }
    else {
      console.log("C'est pas le bon qrCode");
    }

  }

}

