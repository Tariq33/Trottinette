import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Fournisseur} from "../model/fournisseur";
import {Administrateur} from '../model/administrateur';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  private fournisseurs: Array<Fournisseur> = new Array<Fournisseur>();

  constructor(private http: HttpClient) {
    this.load();
  }

  findAll(): Array<Fournisseur> {
    return this.fournisseurs;
  }

  findById(id: number): Observable<Fournisseur> {
    return this.http.get<Fournisseur>('http://localhost:8080/fournisseur/' + id);
  }

  findByIdentifiant(identifiant: string): Observable<Fournisseur> {
    return this.http.get<Fournisseur>('http://localhost:8080/fournisseur/moncompte/' + identifiant);
  }

  create(fournisseur: Fournisseur) {
    return this.http.post<Fournisseur>('http://localhost:8080/fournisseur', fournisseur);
  }

  modify(fournisseur: Fournisseur) {
    return this.http.put<Fournisseur>('http://localhost:8080/fournisseur/' + fournisseur.id, fournisseur);
  }

  deleteById(id: number) {
    this.http.delete('http://localhost:8080/fournisseur/' + id).subscribe(resp => this.load(), error => console.log(error));
  }

  load() {
    this.http.get<Array<Fournisseur>>('http://localhost:8080/fournisseur').subscribe(resp => {
      this.fournisseurs = resp;
    }, error => console.log(error));
  }
}
