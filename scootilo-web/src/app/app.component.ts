import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'scootilo-web';

  user: string;

  constructor() {
    localStorage.setItem("user", "monIdentifiant");
    this.user = localStorage.getItem("user");
    localStorage.setItem("type", "monType");
  }

  getUser(): string {
    return localStorage.getItem("user");
    ;
  }

}
