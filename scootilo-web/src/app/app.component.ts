import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'scootilo-web';

  constructor() {
    sessionStorage.setItem("utilisateur","");
  }

  getUser(): string {
    if(sessionStorage.getItem("utilisateur")!="") return JSON.parse(sessionStorage.getItem("utilisateur")).identifiant;
    else return "";
  }

  getType():string{
    if(sessionStorage.getItem("utilisateur")!="") return JSON.parse(sessionStorage.getItem("utilisateur")).type;
    else return "";
  }

}
