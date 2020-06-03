import {Component} from '@angular/core';
import {SessionService} from "./service/session.service";
import {Route, Router} from "@angular/router";
import {UtilisateurService} from "./service/utilisateur.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'scootilo-web';

  public href: string = "";

  constructor(public sessionService : SessionService,public router: Router,
              private utilisateurService:UtilisateurService) {

    // this.connexionEnTantQueClient();
    // this.connexionEnTantQueAdministrateur();
    // this.connexionEnTantQueFournisseur();

  }

  ngOnInit() {
    this.href = this.router.url;
    console.log(this.router.url);
  }

  connexionEnTantQueClient () {
    this.utilisateurService.findByIdentifiantAndMotDePasse("jeje", "dede").subscribe(resp => {
    //this.utilisateurService.findByIdentifiantAndMotDePasse("test", "ht").subscribe(resp => {
        this.sessionService.setUtilisateur(resp);
        this.router.navigateByUrl('/accueil');
      },
      error => console.log(error)
    );
  }

  connexionEnTantQueAdministrateur () {
    this.utilisateurService.findByIdentifiantAndMotDePasse("clement_admin", "123456").subscribe(resp => {
        this.sessionService.setUtilisateur(resp);
        this.router.navigateByUrl('/accueil');
      },
      error => console.log(error)
    );
  }

  connexionEnTantQueFournisseur () {
    this.utilisateurService.findByIdentifiantAndMotDePasse("test", "test").subscribe(resp => {
        this.sessionService.setUtilisateur(resp);
        this.router.navigateByUrl('/accueil');
      },
      error => console.log(error)
    );
  }

  redirectOffLineUser() {
    if (Object.keys(this.sessionService.getClient()).length === 0) {
      this.router.navigateByUrl('/creationCompte')
    } else {
      this.router.navigateByUrl('/seDeplacer')
    }
  }


}
