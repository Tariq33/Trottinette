import { Component, OnInit } from '@angular/core';
import {SessionService} from '../../../service/session.service';
import {ItineraireService} from '../../../service/itineraire.service';
import {Fournisseur} from '../../../model/fournisseur';
import {MoyenDeTransport} from '../../../model/moyenDeTransport';
import {Itineraire} from '../../../model/itineraire';

@Component({
  selector: 'app-mon-compte-fournisseur-graphe-gain',
  templateUrl: './mon-compte-fournisseur-graphe-gain.component.html',
  styleUrls: ['./mon-compte-fournisseur-graphe-gain.component.scss']
})
export class MonCompteFournisseurGrapheGainComponent implements OnInit {
    data: any;
    private fournisseurForm = new Fournisseur();
  private itineraires: Array<Itineraire> = new Array<Itineraire>();
    options: any;
  private date: Date = new Date();
  private gain : number;
  private gainTotal = 0;



  ngOnInit(): void {
  }

  constructor(private sessionService: SessionService, private itineraireService: ItineraireService) {
    this.fournisseurForm=this.sessionService.getFournisseur();
    console.log(this.fournisseurForm);
    this.itineraireService.findItineraireByFournisseur(this.fournisseurForm.nom).subscribe( resp => {
      this.itineraires = resp;
      console.log(this.itineraires)

      var gainJanvier: number = 0;
      var gainFevrier: number = 0;
      var gainMars: number = 0;
      var gainAvril: number = 0;

      // var gainTotal: number = 0;


    for(let iti of this.itineraires) {




      var dateIti = JSON.parse(JSON.stringify({ date: iti.heureArrivee }));
      this.gain = iti.moyenDeTransport.prixMinute * iti.duree;
      this.gainTotal += this.gainTotal;
      let mois= dateIti.date.substr(8,2);
      let annee = dateIti.date.substr(0,4);

      let ToDay: Date = new Date();


      if (annee == ToDay.getFullYear()) {

        if (mois == "01") {
          gainJanvier +=  this.gain;
        } else if (mois == "02") {
          gainFevrier += this.gain;
        } else if (mois == "03") {
          gainMars += this.gain;
        } else if (mois == "04") {
          gainAvril += this.gain;
        }
      }

    }
    this.gainTotal =  gainJanvier + gainFevrier + gainMars + gainAvril;
    var dataGainTotal = [gainJanvier, gainFevrier, gainMars, gainAvril];







    this.data = {
      labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
      datasets: [
        {
          label: 'Total',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: [gainJanvier, gainFevrier, gainMars, gainAvril, 0, 0, 0]
        },
        {
          label: 'Vélo',
          backgroundColor: '#FFCE56',
          borderColor: '#FFCE56',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'Trottinette',
          backgroundColor: '#FF6384',
          borderColor: '#FF6384',
          data: [28, 48, 40, 19, 86, 27, 90]
        },
        {
          label: 'Scooter',
          backgroundColor: '#36A2EB',
          borderColor: '#36A2EB',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    }
    })
  }
  }


