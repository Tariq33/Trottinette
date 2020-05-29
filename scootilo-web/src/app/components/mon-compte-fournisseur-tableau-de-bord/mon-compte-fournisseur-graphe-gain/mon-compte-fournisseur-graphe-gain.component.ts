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

  ngOnInit(): void {
  }

  constructor(private sessionService: SessionService, private itineraireService: ItineraireService) {
    this.fournisseurForm=this.sessionService.getFournisseur();
    this.itineraireService.findItineraireByFournisseur(this.fournisseurForm.nom).subscribe( resp => {
      this.itineraires = resp;
      console.log(this.itineraires)
      console.log(Date.now())
      })









    this.data = {
      labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
      datasets: [
        {
          label: 'Total',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: [28, 48, 40, 19, 86, 27, 90]
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
  }
  }


