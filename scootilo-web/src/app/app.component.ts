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
  identifiant:string;
  motDePasse:string;

  public href: string = "";

  constructor(public sessionService : SessionService,public router: Router, private utilisateurService:UtilisateurService) {

    this.connexionEnTantQueClient();
    // this.connexionEnTantQueAdministrateur();
    // this.connexionEnTantQueFournisseur();

  }

  ngOnInit() {
    this.href = this.router.url;
    console.log(this.router.url);
  }

  checkUser () {
    this.utilisateurService.findByIdentifiantAndMotDePasse(this.identifiant, this.motDePasse).subscribe(resp => {
        this.sessionService.setUtilisateur(resp);
        console.log(resp);
        // this.router.navigateByUrl('/accueil');
      },
      error => console.log(error)
    );
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

  themeClair() {
    document.documentElement.style.setProperty('--border-color', "rgba(50,162,228,0.5)");
    document.documentElement.style.setProperty('--bg-color', "rgba(50,162,228,0.5)");
    document.documentElement.style.setProperty('--img-accueil', "url('/assets/miroir_eau.jpg')");
    document.documentElement.style.setProperty('--bg-navbar', "rgba(248,249,250,0.5)");
    document.documentElement.style.setProperty('--text-navbar', "black");
    document.documentElement.style.setProperty('--img-fond', "url('../../../assets/testFond.jpg')");
    document.documentElement.style.setProperty('--img-navbar', "url('../../../assets/LOGO_scootilo.png')");
    document.documentElement.style.setProperty('--text-accueil', "black");
  }

  themeSombre() {
    document.documentElement.style.setProperty('--border-color', "white");
    document.documentElement.style.setProperty('--bg-color', "grey");
    document.documentElement.style.setProperty('--img-accueil', "url('/assets/bg2.jpg')");
    document.documentElement.style.setProperty('--bg-navbar', "black");
    document.documentElement.style.setProperty('--text-navbar', "white");
    document.documentElement.style.setProperty('--text-accueil', "white");
    document.documentElement.style.setProperty('--img-fond', "url('../../../assets/fond noir2.jpg')");
    document.documentElement.style.setProperty('--img-navbar', "url('../../../assets/LOGO_scootilo_navbar.png')");
  }




}
