import {Itineraire} from "./itineraire";
import {Fournisseur} from "./fournisseur";

export class PaiementFournisseur {
  id: number;
  version: number;
  montant: number;
  date: Date;
  numeroDeTransaction: String;
  itineraire: Itineraire;
  fournisseur: Fournisseur;


  constructor(id?: number, version?: number, montant?: number, date?: Date, numeroDeTransaction?: String, itineraire?: Itineraire, fournisseur?: Fournisseur) {
    this.id = id;
    this.version = version;
    this.montant = montant;
    this.date = date;
    this.numeroDeTransaction = numeroDeTransaction;
    this.itineraire = itineraire;
    this.fournisseur = fournisseur;
  }
}
