import { Injectable } from '@angular/core';
import {Utilisateur} from "../model/utilisateur";
import {Client} from "../model/client";
import {Fournisseur} from "../model/fournisseur";
import {MoyenDeTransport} from '../model/moyenDeTransport';
import {Administrateur} from "../model/administrateur";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() {
    this.setUtilisateur(new Utilisateur());
  }

  getClient(): Client{
    return JSON.parse(sessionStorage.getItem("utilisateur"));
  }

  getFournisseur(): Fournisseur{
    return JSON.parse(sessionStorage.getItem("utilisateur"));
  }

  getAdmin(): Administrateur{
    return JSON.parse(sessionStorage.getItem("utilisateur"));
  }

  setUtilisateur(utilisateur: Utilisateur){
    sessionStorage.setItem("utilisateur",JSON.stringify(utilisateur));
  }

  setMoyenDeTransportReserve(moyenDeTransport: MoyenDeTransport){
    sessionStorage.setItem("moyenDeTransport",JSON.stringify(moyenDeTransport));
  }

  getMoyenDeTransportReserve(): MoyenDeTransport {
    return JSON.parse(sessionStorage.getItem("moyenDeTransport"));
  }

  removeSessionStorageMoyenDeTransport() {
  sessionStorage.removeItem("moyenDeTransport");
  }

  getIdentifiant(): string {
    return JSON.parse(sessionStorage.getItem("utilisateur")).identifiant;
  }

  getType():string{
    return JSON.parse(sessionStorage.getItem("utilisateur")).type;
  }

  offUtilisateur(){
    sessionStorage.clear();
    window.location.reload();
    location.replace('/accueil');
  }

}
