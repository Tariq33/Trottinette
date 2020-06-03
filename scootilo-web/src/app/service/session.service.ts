import { Injectable } from '@angular/core';
import {Utilisateur} from "../model/utilisateur";
import {Client} from "../model/client";
import {Fournisseur} from "../model/fournisseur";
import {MoyenDeTransport} from '../model/moyenDeTransport';
import {Administrateur} from "../model/administrateur";
import {Reservation} from '../model/Reservation';
import {Itineraire} from '../model/itineraire';

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

  getUtilisateur(){
    return JSON.parse(sessionStorage.getItem("utilisateur"));
  }

  setMoyenDeTransportReserve(moyenDeTransport: MoyenDeTransport){
    sessionStorage.setItem("moyenDeTransport",JSON.stringify(moyenDeTransport));
  }

  getMoyenDeTransportReserve(): MoyenDeTransport {
    return JSON.parse(sessionStorage.getItem("moyenDeTransport"));
  }

  setAdresseAndTempsDeMarche(adresseAndTempsDeMarche: any) {
    sessionStorage.setItem("adresseAndTempsDeMarche", JSON.stringify(adresseAndTempsDeMarche));
  }

  getAdresseAndTempsDeMarche(): any {
    return JSON.parse(sessionStorage.getItem("adresseAndTempsDeMarche"));
  }

  removeSessionStorageAdresseMoyenDeTransportReservee() {
    sessionStorage.removeItem("adresseMoyenDeTransportReservee");
  }

  removeSessionStorageMoyenDeTransport() {
  sessionStorage.removeItem("moyenDeTransport");
  }

  setReservation(reservation: Reservation) {
    sessionStorage.setItem("reservation", JSON.stringify(reservation));
  }

  getReservation(): Reservation {
    return  JSON.parse(sessionStorage.getItem("reservation"));
  }

  setItineraire(itineraire: Itineraire) {
    sessionStorage.setItem("itineraire", JSON.stringify(itineraire));
  }

  getItineraire(): Itineraire {
    return  JSON.parse(sessionStorage.getItem("itineraire"));
  }

  getIdentifiant(): string {
    return JSON.parse(sessionStorage.getItem("utilisateur")).identifiant;
  }

  getType():string{
    return JSON.parse(sessionStorage.getItem("utilisateur")).type;
  }

  setArriveeCoords(lat : number, long : number){
    sessionStorage.setItem("CoordsArr", JSON.stringify([lat,long]));
  }

  getArriveeCoords(): number[]{
    return JSON.parse(sessionStorage.getItem("CoordsArr"));
  }

  offUtilisateur(){
    sessionStorage.clear();
    window.location.reload();
    location.replace('/accueil');
  }

}
