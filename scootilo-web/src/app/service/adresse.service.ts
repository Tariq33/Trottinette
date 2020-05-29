import { Injectable } from '@angular/core';
import {Administrateur} from "../model/administrateur";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Adresse} from "../model/adresse";
import {MoyenDeTransport} from "../model/moyenDeTransport";
import {Client} from "../model/client";

@Injectable({
  providedIn: 'root'
})
export class AdresseService {

  private adresses: Array<Adresse> = new Array<Adresse>();

  constructor(private http: HttpClient) {
    this.load();
  }

  findAll(): Array<Adresse> {
    return this.adresses;
  }

  FindAddressByUserId(id: number): Observable<Array<Adresse>> {
    return this.http.get<Array<Adresse>>('http://localhost:8080/adresse/findbyid/' + id);
  }

  findById(id: number): Observable<Adresse> {
    return this.http.get<Adresse>('http://localhost:8080/adresse/' + id);
  }

  create(adresse: Adresse) {
    return this.http.post<Adresse>('http://localhost:8080/adresse', adresse);
  }

  modify(adresse: Adresse) {
    return this.http.put<Administrateur>('http://localhost:8080/adresse/' + adresse.id, adresse);
  }

  deleteById(id: number) {
    this.http.delete('http://localhost:8080/adresse/' + id).subscribe(resp => this.load(), error => console.log(error));
  }

  load() {
    this.http.get<Array<Adresse>>('http://localhost:8080/adresse').subscribe(resp => {
      this.adresses = resp;
    }, error => console.log(error));
  }
}
