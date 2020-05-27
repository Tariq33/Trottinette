import { Injectable } from '@angular/core';
import {PaiementFournisseur} from "../model/PaiementFournisseur";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaiementFournisseurService {


  private paiementsFournisseur: Array<PaiementFournisseur> = new Array<PaiementFournisseur>();


  constructor(private http: HttpClient) {
    this.load();
  }

  findAll(): Array<PaiementFournisseur> {
    return this.paiementsFournisseur;
  }

  findById(id: number): Observable<PaiementFournisseur> {
    return this.http.get<PaiementFournisseur>("http://localhost:8080/paiementFournisseur/" + id);
  }

  create(paiementFournisseur: PaiementFournisseur) {
    return this.http.post<PaiementFournisseur>("http://localhost:8080/paiementFournisseur", paiementFournisseur);
  }

  modify(paiementFournisseur: PaiementFournisseur) {
    return this.http.put<PaiementFournisseur>("http://localhost:8080/paiementFournisseur/" + paiementFournisseur.id, paiementFournisseur);
  }

  deleteById(id: number) {
    this.http.delete("http://localhost:8080/paiementFournisseur/" + id).subscribe(resp => this.load(), error => console.log(error))
  }

  load() {
    this.http.get<Array<PaiementFournisseur>>("http://localhost:8080/paiementFournisseur").subscribe(resp => {
      this.paiementsFournisseur = resp;
    }, error => console.log(error))
  }


}
