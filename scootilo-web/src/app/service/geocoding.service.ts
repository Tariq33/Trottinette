import { Injectable } from '@angular/core';
import {Fournisseur} from "../model/fournisseur";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  // lat : number = 44.838102;
  // long : number = -0.573906;
  token : string = "8f0a73c88d3304";

  constructor(private http: HttpClient) {

  }


  getAddressWithGps(lat: number, long:number): Observable<any> {
    return this.http.get<any>("https://eu1.locationiq.com/v1/reverse.php?key="
      + this.token + '&lat=' + lat + '&lon=' + long + '&format=json');
  }

  getGpsWithAddress(adresse : string): Observable<any> {
    return this.http.get<any>("https://eu1.locationiq.com/v1/search.php?key="
      + this.token + '&q=' + adresse + '&format=json');
  }

  findByIdentifiant(identifiant: string): Observable<Fournisseur> {
    return this.http.get<Fournisseur>('http://localhost:8080/fournisseur/moncompte/' + identifiant);
  }
}
