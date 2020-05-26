import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Administrateur} from "../model/administrateur";

@Injectable({
  providedIn: 'root'
})
export class AdministrateurService {

  private administrateurs: Array<Administrateur> = new Array<Administrateur>();

  constructor(private http: HttpClient) {
    this.load();
  }

  findAll(): Array<Administrateur> {
    return this.administrateurs;
  }

  findById(id: number): Observable<Administrateur> {
    return this.http.get<Administrateur>('http://localhost:8080/api/administrateur/' + id);
  }

  create(administrateur: Administrateur) {
    return this.http.post<Administrateur>('http://localhost:8080/api/administrateur', administrateur);
  }

  modify(administrateur: Administrateur) {
    return this.http.put<Administrateur>('http://localhost:8080/api/administrateur/' + administrateur.id, administrateur);
  }

  deleteById(id: number) {
    this.http.delete('http://localhost:8080/api/administrateur/' + id).subscribe(resp => this.load(), error => console.log(error));
  }

  load() {
    this.http.get<Array<Administrateur>>('http://localhost:8080/api/administrateur').subscribe(resp => {
      this.administrateurs = resp;
    }, error => console.log(error));
  }
}
