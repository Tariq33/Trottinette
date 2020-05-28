import {Component, OnInit} from '@angular/core';
import {Administrateur} from '../../model/administrateur';
import {AdministrateurService} from '../../service/administrateur.service';

@Component({
  selector: 'app-mon-compte-administrateur-info',
  templateUrl: './mon-compte-administrateur-info.component.html',
  styleUrls: ['./mon-compte-administrateur-info.component.scss']
})
export class MonCompteAdministrateurInfoComponent implements OnInit {
  administrateurForm: Administrateur = new Administrateur();

  constructor(private administrateurService: AdministrateurService) {
  }

  ngOnInit(): void {
    let identifiant: string = JSON.parse(sessionStorage.getItem("utilisateur")).identifiant;
    console.log(identifiant);
    console.log(sessionStorage.getItem("utilisateur"));
    this.administrateurForm.prenom = JSON.parse(sessionStorage.getItem("utilisateur")).prenom;
    this.administrateurForm.nom = JSON.parse(sessionStorage.getItem("utilisateur")).nom;
    this.administrateurForm.email = JSON.parse(sessionStorage.getItem("utilisateur")).email;

    // this.administrateurService.findByIdentifiant(identifiant).subscribe(resp => this.administrateurForm = resp, error => console.log(error));

  }

  edit(id: number) {
    this.administrateurService.findById(id).subscribe(resp => {
      this.administrateurForm = resp;
      this.administrateurService.load();
    },
      error => console.log(error)
    )
  }

}
