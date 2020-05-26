import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FinDeTrajet} from "../model/finDeTrajet";

@Injectable({
  providedIn: 'root'
})
export class FinDeTrajetService {

  private finDeTrajets: Array<FinDeTrajet> = new Array<FinDeTrajet>();

  constructor(private http: HttpClient) {
    this.load();
  }

  findAll(): Array<FinDeTrajet> {
    return this.finDeTrajets;
  }

  findById(id: number): Observable<FinDeTrajet> {
    return this.http.get<FinDeTrajet>('http://localhost:8080/api/stagiaire/' + id);
  }

  create(finDeTrajet: FinDeTrajet) {
    return this.http.post<FinDeTrajet>('http://localhost:8080/api/stagiaire', finDeTrajet);
  }

  modify(finDeTrajet: FinDeTrajet) {
    return this.http.put<FinDeTrajet>('http://localhost:8080/api/stagiaire/' + finDeTrajet.id, finDeTrajet);
  }

  deleteById(id: number) {
    this.http.delete('http://localhost:8080/api/stagiaire/' + id).subscribe(resp => this.load(), error => console.log(error));
  }

  load() {
    this.http.get<Array<FinDeTrajet>>('http://localhost:8080/api/stagiaire').subscribe(resp => {
      this.finDeTrajets = resp;
    }, error => console.log(error));
  }
}
