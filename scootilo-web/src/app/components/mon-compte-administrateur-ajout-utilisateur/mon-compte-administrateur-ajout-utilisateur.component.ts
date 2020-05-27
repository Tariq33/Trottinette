import {Component, Input, OnInit} from '@angular/core';
import {Utilisateur} from '../../model/utilisateur';
import {UtilisateurService} from '../../service/utilisateur.service';
import {HttpClient} from '@angular/common/http';
import {MonCompteAdministrateurListeUtilisateurComponent} from '../mon-compte-administrateur-liste-utilisateur/mon-compte-administrateur-liste-utilisateur.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-mon-compte-administrateur-ajout-utilisateur',
  templateUrl: './mon-compte-administrateur-ajout-utilisateur.component.html',
  styleUrls: ['./mon-compte-administrateur-ajout-utilisateur.component.scss']
})
export class MonCompteAdministrateurAjoutUtilisateurComponent implements OnInit {

  utilisateurForm: Utilisateur = new Utilisateur();


  constructor(private utilisateurService: UtilisateurService, private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
  this.route.params.subscribe(params => {
    let id = params['id'];

    if(!id) {
      this.utilisateurForm = new Utilisateur();
    } else {
      this.utilisateurService.findById(id).subscribe(resp => this.utilisateurForm = resp, error => console.log(error));
    }

  });
}


  save() {
    if (!this.utilisateurForm.id) {
      this.utilisateurService.create(this.utilisateurForm).subscribe(resp => {
          this.utilisateurForm = null;
          this.utilisateurService.load();
        },
        error => console.log(error)
      )

    } else {
      this.utilisateurService.modify(this.utilisateurForm).subscribe(resp => {
        this.utilisateurForm = null;
        this.utilisateurService.load();
      }, error => console.log(error));
    }
  }

  cancel() {
    this.utilisateurForm = null;
  }


}
