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
  private gain : number;
  private gainTotal = [0,0,0,0,0,0,0,0,0,0,0,0];
  private gainVelo = [0,0,0,0,0,0,0,0,0,0,0,0];
  private gainTrot = [0,0,0,0,0,0,0,0,0,0,0,0];
  private gainScoot = [0,0,0,0,0,0,0,0,0,0,0,0];
  public gainTot = 0;
  // @ts-ignore
  public Today : Date = new Date();


  ngOnInit(): void {
  }

  constructor(private sessionService: SessionService, private itineraireService: ItineraireService) {
    this.fournisseurForm=this.sessionService.getFournisseur();
    console.log(this.fournisseurForm);
    this.itineraireService.findItineraireByFournisseur(this.fournisseurForm.nom).subscribe( resp => {
      this.itineraires = resp;
      console.log(this.itineraires)



    for(let iti of this.itineraires) {
      //récupérer les mois de la date en format string
      var dateIti = JSON.parse(JSON.stringify({ date: iti.heureArrivee }));
      this.gain = iti.moyenDeTransport.prixMinute * iti.duree;
      this.gainTot += this.gain;
      let mois= dateIti.date.substr(8,2);
      let annee = dateIti.date.substr(0,4);

      // @ts-ignore
      let ToDay: Date = new Date();


      if (annee == ToDay.getFullYear()) {

        if (mois == "01") {
          this.gainTotal[0] += this.gain;
            if(iti.moyenDeTransport.typeDeTransport == "velo") {
              this.gainVelo[0] += this.gain;
            } else if (iti.moyenDeTransport.typeDeTransport == "scooter") {
              this.gainScoot[0] += this.gain;
            } else {
              this.gainTrot[0] += this.gain;
            }
        } else if (mois == "02") {
          this.gainTotal[1] += this.gain;
            if(iti.moyenDeTransport.typeDeTransport == "velo") {
              this.gainVelo[1] += this.gain;
            } else if (iti.moyenDeTransport.typeDeTransport == "scooter") {
              this.gainScoot[1] += this.gain;
            } else {
              this.gainTrot[1] += this.gain;
            }
        }
        } else if (mois == "03") {
        this.gainTotal[2] += this.gain;
          if(iti.moyenDeTransport.typeDeTransport == "velo") {
            this.gainVelo[2] += this.gain;
          } else if (iti.moyenDeTransport.typeDeTransport == "scooter") {
            this.gainScoot[2] += this.gain;
          } else {
            this.gainTrot[2] += this.gain;
          }
        } else if (mois == "04") {
        this.gainTotal[3] += this.gain;
          if(iti.moyenDeTransport.typeDeTransport == "velo") {
            this.gainVelo[3] += this.gain;
          } else if (iti.moyenDeTransport.typeDeTransport == "scooter") {
            this.gainScoot[3] += this.gain;
          } else {
            this.gainTrot[3] += this.gain;
          }
        }  else if (mois == "05") {
        this.gainTotal[4] += this.gain;;
          if(iti.moyenDeTransport.typeDeTransport == "velo") {
            this.gainVelo[4] += this.gain;
          } else if (iti.moyenDeTransport.typeDeTransport == "scooter") {
            this.gainScoot[4] += this.gain;
          } else {
            this.gainTrot[4] += this.gain;
          }
        } else if (mois == "06") {
        this.gainTotal[5] += this.gain;
          if(iti.moyenDeTransport.typeDeTransport == "velo") {
            this.gainVelo[5] += this.gain;
          } else if (iti.moyenDeTransport.typeDeTransport == "scooter") {
            this.gainScoot[5] += this.gain;
          } else {
            this.gainTrot[5] += this.gain;
          }
        } else if (mois == "07") {
        this.gainTotal[6] += this.gain;
          if(iti.moyenDeTransport.typeDeTransport == "velo") {
            this.gainVelo[6] += this.gain;
          } else if (iti.moyenDeTransport.typeDeTransport == "scooter") {
            this.gainScoot[6] += this.gain;
          } else {
            this.gainTrot[6] += this.gain;
          }
        } else if (mois == "08") {
        this.gainTotal[7] += this.gain;
          if(iti.moyenDeTransport.typeDeTransport == "velo") {
            this.gainVelo[7] += this.gain;
          } else if (iti.moyenDeTransport.typeDeTransport == "scooter") {
            this.gainScoot[7] += this.gain;
          } else {
            this.gainTrot[7] += this.gain;
          }
        } else if (mois == "09") {
        this.gainTotal[8] += this.gain;
          if(iti.moyenDeTransport.typeDeTransport == "velo") {
            this.gainVelo[8] += this.gain;
          } else if (iti.moyenDeTransport.typeDeTransport == "scooter") {
            this.gainScoot[8] += this.gain;
          } else {
            this.gainTrot[8] += this.gain;
          }
        } else if (mois == "10") {
        this.gainTotal[9] += this.gain;
          if(iti.moyenDeTransport.typeDeTransport == "velo") {
            this.gainVelo[9] += this.gain;
          } else if (iti.moyenDeTransport.typeDeTransport == "scooter") {
            this.gainScoot[9] += this.gain;
          } else {
            this.gainTrot[9] += this.gain;
          }
        } else if (mois == "11") {
        this.gainTotal[10] += this.gain;
          if(iti.moyenDeTransport.typeDeTransport == "velo") {
            this.gainVelo[10] += this.gain;
          } else if (iti.moyenDeTransport.typeDeTransport == "scooter") {
            this.gainScoot[10] += this.gain;
          } else {
            this.gainTrot[10] += this.gain;
          }
        } else if (mois == "12") {
        this.gainTotal[11] += this.gain;
          if(iti.moyenDeTransport.typeDeTransport == "velo") {
            this.gainVelo[11] += this.gain;
          } else if (iti.moyenDeTransport.typeDeTransport == "scooter") {
            this.gainScoot[11] += this.gain;
          } else {
            this.gainTrot[11] += this.gain;
          }
        }

      }

    this.data = {
      labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
      datasets: [
        {
          label: 'Total',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: this.gainTotal
        },
        {
          label: 'Vélo',
          backgroundColor: '#FFCE56',
          borderColor: '#FFCE56',
          data: this.gainVelo
        },
        {
          label: 'Trottinette',
          backgroundColor: '#FF6384',
          borderColor: '#FF6384',
          data: this.gainTrot
        },
        {
          label: 'Scooter',
          backgroundColor: '#36A2EB',
          borderColor: '#36A2EB',
          data: this.gainScoot
        }
      ]
    }
    })
  }
  }


