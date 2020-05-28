import { Component, OnInit } from '@angular/core';
import {MoyenDeTransport} from '../../model/moyenDeTransport';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {MoyenDeTransportService} from '../../service/moyen-de-transport.service';

@Component({
  selector: 'app-mon-compte-administrateur-ajout-moyen-transport',
  templateUrl: './mon-compte-administrateur-ajout-moyen-transport.component.html',
  styleUrls: ['./mon-compte-administrateur-ajout-moyen-transport.component.scss']
})
export class MonCompteAdministrateurAjoutMoyenTransportComponent implements OnInit {
  moyenDeTransportForm: MoyenDeTransport = new MoyenDeTransport();


  constructor(private moyenDeTransportService: MoyenDeTransportService, private http: HttpClient, private route: ActivatedRoute) { }

  typeUser: string = JSON.parse(sessionStorage.getItem("utilisateur")).type

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];

      if(!id) {
        this.moyenDeTransportForm = new MoyenDeTransport();
      } else {
        this.moyenDeTransportService.findById(id).subscribe(resp => this.moyenDeTransportForm = resp, error => console.log(error));
      }

    });
  }

  save() {
    if (!this.moyenDeTransportForm.id) {
      this.moyenDeTransportService.create(this.moyenDeTransportForm).subscribe(resp => {
          this.moyenDeTransportForm = null;
          this.moyenDeTransportService.load();
        },
        error => console.log(error)
      )

    } else {
      this.moyenDeTransportService.modify(this.moyenDeTransportForm).subscribe(resp => {
        this.moyenDeTransportForm = null;
        this.moyenDeTransportService.load();
      }, error => console.log(error));
    }
  }

  cancel() {
    this.moyenDeTransportForm = null;
  }

}
