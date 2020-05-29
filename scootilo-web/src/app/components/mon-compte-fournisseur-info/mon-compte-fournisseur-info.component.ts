import { Component, OnInit } from '@angular/core';
import {Fournisseur} from '../../model/fournisseur';
import {SessionService} from '../../service/session.service';
import {AdministrateurService} from '../../service/administrateur.service';
import {FournisseurService} from '../../service/fournisseur.service';

@Component({
  selector: 'app-mon-compte-fournisseur-info',
  templateUrl: './mon-compte-fournisseur-info.component.html',
  styleUrls: ['./mon-compte-fournisseur-info.component.scss']
})
export class MonCompteFournisseurInfoComponent implements OnInit {
  fournisseurForm: Fournisseur = new Fournisseur();

  constructor(private sessionService : SessionService, private fournisseurService: FournisseurService) {
    this.fournisseurForm=this.sessionService.getFournisseur();
  }

  ngOnInit(): void {
  }

  edit(id: number) {
    this.fournisseurService.findById(id).subscribe(resp => {
        this.fournisseurForm = resp;
        this.fournisseurService.load();
      },
      error => console.log(error)
    )
  }
}
