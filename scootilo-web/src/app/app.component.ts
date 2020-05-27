import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'scootilo-web';

  constructor() {
    sessionStorage.setItem("user","monIdentifiant");
    sessionStorage.setItem("type","monType");
  }
}
