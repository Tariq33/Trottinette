import { Injectable } from '@angular/core';
import {Utilisateur} from "../model/utilisateur";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private utilisateurs: Array<Utilisateur> = new Array<Utilisateur>();


  constructor(private http: HttpClient) {
    this.load();
  }

  findAll(): Array<Utilisateur> {
    return this.utilisateurs;
  }

  findById(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>("http://localhost:8080/utilisateur/" + id);
  }


  findByIdentifiantAndMotDePasse(identifiant: string, motDePasse: string): Observable<Utilisateur> {
    let login = {
      "identifiant":identifiant,
      "motDePasse":motDePasse};
    return this.http.post<Utilisateur>("http://localhost:8080/utilisateur/connexion",login);
  }

  create(utilisateur: Utilisateur) {
    return this.http.post<Utilisateur>("http://localhost:8080/utilisateur", utilisateur);
  }

  modify(utilisateur: Utilisateur) {
    return this.http.put<Utilisateur>("http://localhost:8080/utilisateur/" + utilisateur.id, utilisateur);
  }

  deleteById(id: number) {
    this.http.delete("http://localhost:8080/utilisateur/" + id).subscribe(resp => this.load(), error => console.log(error))
  }

  load() {
    this.http.get<Array<Utilisateur>>("http://localhost:8080/utilisateur").subscribe(resp => {
      this.utilisateurs = resp;
    }, error => console.log(error))
  }


}
