import { Component, OnInit } from '@angular/core';
import {MoyenDeTransportService} from '../../../service/moyen-de-transport.service';
import {MoyenDeTransport} from '../../../model/moyenDeTransport';
import {SessionService} from '../../../service/session.service';
import {Fournisseur} from '../../../model/fournisseur';

@Component({
  selector: 'app-mon-compte-fournisseur-graphe-repartition-transport',
  templateUrl: './mon-compte-fournisseur-graphe-repartition-transport.component.html',
  styleUrls: ['./mon-compte-fournisseur-graphe-repartition-transport.component.scss']
})
export class MonCompteFournisseurGrapheRepartitionTransportComponent implements OnInit {
  data: any;
  options: any;
  dataPie: any = [];
  private moyenTransports: Array<MoyenDeTransport> = new Array<MoyenDeTransport>();
  private fournisseurForm = new Fournisseur();
  private compteurVelo: number = 0;
  private  compteurTrot: number = 0;
  private compteurScoot: number = 0;
  private compteurMoyTransport: number = 0;

  constructor(private moyenDeTransportService: MoyenDeTransportService, private sessionService: SessionService) {
    this.fournisseurForm=this.sessionService.getFournisseur();
    this.moyenDeTransportService.findAllByFournisseur(this.fournisseurForm.nom).subscribe( resp => {
      this.moyenTransports = resp;
      for (let moy of this.moyenTransports) {
        this.compteurMoyTransport += 1;
        if (moy.typeDeTransport == 'scooter') {
          this.compteurScoot += 1;

        } else if (moy.typeDeTransport == 'trottinette') {
          this.compteurTrot += 1;

        } else {
          this.compteurVelo += 1;

        }

      }
      this.dataPie = [this.compteurTrot, this.compteurScoot, this.compteurVelo];
      // console.log(this.dataPie)

      this.data = {
        labels: ['Trottinette','Scooter','Vélo'],
        datasets: [
          {

            data: this.dataPie,
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56"
            ],
            hoverBackgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56"
            ]
          }]
      };

      this.options = {
        title: {
          display: true,
          text: 'Répartition des moyens de transport',
          fontSize: 16
        },
        legend: {
          position: 'bottom'
        }
      };
    })


  }



  ngOnInit(): void {

  }

}




