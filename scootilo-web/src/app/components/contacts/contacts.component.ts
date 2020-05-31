import { Component, OnInit } from '@angular/core';
import {GeocodingService} from "../../service/geocoding.service";
import {Observable} from "rxjs";
import {Adresse} from "../../model/adresse";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  lat : number = 44.838102;
  long : number = -0.573906;
  adresse : any;

  constructor(private geocodingService : GeocodingService) {
  this.load();

  }

  ngOnInit(): void {
  }

  load(){
    // Premier exemple en rentrer la latitude et la longitude
    this.geocodingService.getAddressWithGps(this.lat,this.long).subscribe(resp => {
      this.adresse =  resp.display_name;
      console.log(this.adresse);
    }, error => console.log(error));

    // Deuxième exemple en rentrant une adresse en string, attention il peut y avoir plusieurs résultats donc faut être précis mais c'est pas ouf niveau précision
    this.geocodingService.getGpsWithAddress("86 Avenue John Fitzgerald Kennedy 33700 Merignac").subscribe(resp => {
      console.log(resp);
      console.log(resp[0].lat);
      console.log(resp[0].lon);
    }, error => console.log(error));
  }

}
