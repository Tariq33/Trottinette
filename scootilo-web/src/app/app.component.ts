import {Component} from '@angular/core';
import {SessionService} from "./service/session.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'scootilo-web';

  public href: string = "";

  constructor(public sessionService : SessionService,public router: Router) {}

  ngOnInit() {
    this.href = this.router.url;
    console.log(this.router.url);
  }

}
