import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Itineraire} from "../model/itineraire";

@Injectable({
  providedIn: 'root'
})
export class ItineraireService {

  private itineraires: Array<Itineraire> = new Array<Itineraire>();

  constructor(private http: HttpClient) {
    this.load();
  }

  findAll(): Array<Itineraire> {
    return this.itineraires;
  }

  findById(id: number): Observable<Itineraire> {
    return this.http.get<Itineraire>('http://localhost:8080/api/itineraire/' + id);
  }

  create(itineraire: Itineraire) {
    return this.http.post<Itineraire>('http://localhost:8080/api/itineraire', itineraire);
  }

  modify(itineraire: Itineraire) {
    return this.http.put<Itineraire>('http://localhost:8080/api/itineraire/' + itineraire.id, itineraire);
  }

  deleteById(id: number) {
    this.http.delete('http://localhost:8080/api/itineraire/' + id).subscribe(resp => this.load(), error => console.log(error));
  }

  load() {
    this.http.get<Array<Itineraire>>('http://localhost:8080/api/itineraire').subscribe(resp => {
      this.itineraires = resp;
    }, error => console.log(error));
  }
}
