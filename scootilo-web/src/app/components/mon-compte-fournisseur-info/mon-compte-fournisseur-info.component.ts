import { Component, OnInit } from '@angular/core';
import {Fournisseur} from '../../model/fournisseur';
import {FournisseurService} from '../../service/fournisseur.service';

@Component({
  selector: 'app-mon-compte-fournisseur-info',
  templateUrl: './mon-compte-fournisseur-info.component.html',
  styleUrls: ['./mon-compte-fournisseur-info.component.scss']
})
export class MonCompteFournisseurInfoComponent implements OnInit {
  fournisseurForm: Fournisseur = new Fournisseur();

  constructor(private fournisseurService: FournisseurService) {
  }

  ngOnInit(): void {
    let identifiant: string = 'Lime';
    this.fournisseurService.findByIdentifiant(identifiant).subscribe(resp => this.fournisseurForm = resp, error => console.log(error));

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
