import {Component, OnInit} from '@angular/core';
import {UtilisateurService} from '../../service/utilisateur.service';
import {Utilisateur} from '../../model/utilisateur';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-mon-compte-administrateur-liste-utilisateur',
  templateUrl: './mon-compte-administrateur-liste-utilisateur.component.html',
  styleUrls: ['./mon-compte-administrateur-liste-utilisateur.component.scss']
})
export class MonCompteAdministrateurListeUtilisateurComponent implements OnInit {

  utilisateurForm: Utilisateur = null;
  private utilisateurs: Array<Utilisateur> = new Array<Utilisateur>();

  constructor(private utilisateurService: UtilisateurService, private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  list(): Array<Utilisateur> {
    return this.utilisateurService.findAll();
  }

  delete(id: number) {
    this.utilisateurService.deleteById(id);

  }

  edit(id: number) {
    this.utilisateurService.findById(id).subscribe(resp => {
      this.utilisateurForm = resp;
      console.log(this.utilisateurForm);
    }, error => console.log(error));
  }

}
