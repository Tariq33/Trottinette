import { Component, OnInit } from '@angular/core';
import {Utilisateur} from '../../model/utilisateur';
import {MoyenDeTransportService} from '../../service/moyen-de-transport.service';
import {MoyenDeTransport} from '../../model/moyenDeTransport';

@Component({
  selector: 'app-mon-compte-administrateur-liste-moyen-transport',
  templateUrl: './mon-compte-administrateur-liste-moyen-transport.component.html',
  styleUrls: ['./mon-compte-administrateur-liste-moyen-transport.component.scss']
})
export class MonCompteAdministrateurListeMoyenTransportComponent implements OnInit {

  moyenDeTransportForm: MoyenDeTransport = null;

  constructor(private moyenDeTransportService: MoyenDeTransportService) { }

  ngOnInit(): void {
  }

  list(): Array<MoyenDeTransport> {
    return this.moyenDeTransportService.findAll();
  }

  delete(id: number) {
    this.moyenDeTransportService.deleteById(id);
  }

  edit(id: number) {
    this.moyenDeTransportService.findById(id).subscribe(resp => this.moyenDeTransportForm = resp, error => console.log(error));
  }

}
