import {Component} from '@angular/core';
import {SessionService} from "./service/session.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'scootilo-web';

  constructor(public sessionService : SessionService) {
  }



}
