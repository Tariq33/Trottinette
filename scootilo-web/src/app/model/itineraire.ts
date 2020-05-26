import {AdresseItineraire} from "./adresseItineraire";
import {MoyenDeTransport} from "./moyenDeTransport";
import {PaiementFournisseur} from "./paiementFournisseur";
import {Reservation} from "./reservation";

export class Itineraire{
  id: number;
  version: number;
  adrDepart: AdresseItineraire;
  adrArrivee: AdresseItineraire;
  heureDepart: Date;
  heureArrivee: Date;
  heureLimite: Date;
  dureeEstimee: number;
  duree: number;
  montant: number;
  acompte: number;
  paiementFournisseur: PaiementFournisseur;
  moyenDeTransport: MoyenDeTransport ;
  reservation: Reservation ;

  constructor(id?: number, version?: number, adrDepart?: AdresseItineraire, adrArrivee?: AdresseItineraire, heureDepart?: Date, heureArrivee?: Date, heureLimite?: Date, dureeEstimee?: number, duree?: number, montant?: number, acompte?: number, paiementFournisseur?: PaiementFournisseur, moyenDeTransport?: MoyenDeTransport, reservation?: Reservation) {
    this.id = id;
    this.version = version;
    this.adrDepart = adrDepart;
    this.adrArrivee = adrArrivee;
    this.heureDepart = heureDepart
    this.heureArrivee = heureArrivee;
    this.heureLimite = heureLimite;
    this.dureeEstimee = dureeEstimee;
    this.duree = duree;
    this.montant = montant;
    this.acompte = acompte;
    this.paiementFournisseur = paiementFournisseur;
    this.moyenDeTransport = moyenDeTransport;
    this.reservation = reservation;
  }

}
