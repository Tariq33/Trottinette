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
    return this.http.get<Administrateur>('http://localhost:8080/administrateur/' + id);
  }

  findByIdentifiant(identifiant: string): Observable<Administrateur> {
    return this.http.get<Administrateur>('http://localhost:8080/administrateur/moncompte/' + identifiant);
  }

  create(administrateur: Administrateur) {
    return this.http.post<Administrateur>('http://localhost:8080/administrateur', administrateur);
  }

  modify(administrateur: Administrateur) {
    return this.http.put<Administrateur>('http://localhost:8080/administrateur/' + administrateur.id, administrateur);
  }

  deleteById(id: number) {
    this.http.delete('http://localhost:8080/administrateur/' + id).subscribe(resp => this.load(), error => console.log(error));
  }

  load() {
    this.http.get<Array<Administrateur>>('http://localhost:8080/administrateur').subscribe(resp => {
      this.administrateurs = resp;
    }, error => console.log(error));
  }
}
