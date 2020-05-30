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

  private gainJanvier: number = 0;
  private gainJanvierVelo: number = 0;
  private gainJanvierTrot: number = 0;
  private gainJanvierScoot: number = 0;
  private gainFevrier: number = 0;
  private gainFevrierVelo: number = 0;
  private gainFevrierTrot: number = 0;
  private gainFevrierScoot: number = 0;
  private gainMars: number = 0;
  private gainMarsVelo: number = 0;
  private gainMarsTrot: number = 0;
  private gainJMarsScoot: number = 0;
  private gainAvril: number = 0;
  private gainAvrilVelo: number = 0;
  private gainAvrilTrot: number = 0;
  private gainAvrilScoot: number = 0;
  private gainMai: number = 0;
  private gainMaiVelo: number = 0;
  private gainMaiTrot: number = 0;
  private gainMaiScoot: number = 0;
  private gainJuin: number = 0;
  private gainJanvierVelo: number = 0;
  private gainJanvierTrot: number = 0;
  private gainJanvierScoot: number = 0;
  private gainJuillet: number = 0;
  private gainJanvierVelo: number = 0;
  private gainJanvierTrot: number = 0;
  private gainJanvierScoot: number = 0;
  private gainAout: number = 0;
  private gainJanvierVelo: number = 0;
  private gainJanvierTrot: number = 0;
  private gainJanvierScoot: number = 0;
  private gainSeptembre: number = 0;
  private gainJanvierVelo: number = 0;
  private gainJanvierTrot: number = 0;
  private gainJanvierScoot: number = 0;
  private gainOctobre: number = 0;
  private gainJanvierVelo: number = 0;
  private gainJanvierTrot: number = 0;
  private gainJanvierScoot: number = 0;
  private gainNovembre: number = 0;
  private gainJanvierVelo: number = 0;
  private gainJanvierTrot: number = 0;
  private gainJanvierScoot: number = 0;
  private gainDecembre: number = 0;
  private gainJanvierVelo: number = 0;
  private gainJanvierTrot: number = 0;
  private gainJanvierScoot: number = 0;
  private gainTotal: number[];

  ngOnInit(): void {
  }

  constructor(private sessionService: SessionService, private itineraireService: ItineraireService) {
    this.fournisseurForm=this.sessionService.getFournisseur();
    console.log(this.fournisseurForm);
    this.itineraireService.findItineraireByFournisseur(this.fournisseurForm.nom).subscribe( resp => {
      this.itineraires = resp;
      console.log(this.itineraires)



      // var gainTotal: number = 0;


    for(let iti of this.itineraires) {




      var dateIti = JSON.parse(JSON.stringify({ date: iti.heureArrivee }));
      this.gain = iti.moyenDeTransport.prixMinute * iti.duree;
      // this.gainTotal += this.gainTotal;
      let mois= dateIti.date.substr(8,2);
      let annee = dateIti.date.substr(0,4);

      let ToDay: Date = new Date();


      if (annee == ToDay.getFullYear()) {

        if (mois == "01") {
          // this.gainJanvier +=  this.gain;
          this.gainTotal[0] += this.gain;
        } else if (mois == "02") {
          this.gainTotal[1] += this.gain;
        }
          // this.gainFevrier += this.gain;
              // if(iti.moyenDeTransport.typeDeTransport == "velo")


        } else if (mois == "03") {
          this.gainMars += this.gain;
        } else if (mois == "04") {
          this.gainAvril += this.gain;
        }  else if (mois == "05") {
          this.gainMai += this.gain;
        } else if (mois == "06") {
          this.gainJuin += this.gain;
        } else if (mois == "07") {
          this.gainJuillet += this.gain;
        } else if (mois == "08") {
          this.gainAout += this.gain;
        } else if (mois == "09") {
          this.gainSeptembre += this.gain;
        } else if (mois == "10") {
          this.gainOctobre += this.gain;
        } else if (mois == "11") {
          this.gainNovembre += this.gain;
        } else if (mois == "12") {
          this.gainDecembre += this.gain;
        }

      }
    // this.gainTotal =  gainJanvier + gainFevrier + gainMars + gainAvril;
    var dataGainTotal = [gainJanvier, gainFevrier, gainMars, gainAvril];







    this.data = {
      labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
      datasets: [
        {
          label: 'Total',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: [this.gainTotal]
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


