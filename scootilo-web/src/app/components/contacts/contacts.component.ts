import {Component, OnInit} from '@angular/core';
import {GeocodingService} from "../../service/geocoding.service";
import {MoyenDeTransport} from "../../model/moyenDeTransport";
import {Client} from "../../model/client";
import {TypeDeTransport} from "../../model/type-de-transport.enum";
import {TypeMoteur} from "../../model/type-moteur.enum";
import {AdresseItineraire} from "../../model/adresseItineraire";
import {Pref} from "../../model/preference2";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  primaryColor: string;
  secondaryColor: string;

  constructor() {
  }

  ngOnInit(): void {
  }


}

