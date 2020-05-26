import {Utilisateur} from "./utilisateur";
import {Adresse} from "./adresse";
import {Preference} from "./preference";
import {Reservation} from "./Reservation";
import {Transaction} from "./Transaction";

export class Client extends Utilisateur {
  solde: number;
  prenom: string;
  adresse: Adresse;
  preference: Preference;
  reservations: Array<Reservation>;
  transactions: Array<Transaction>;

  constructor(solde?: number,prenom?: string, adresse?: Adresse, preference?: Preference, reservations?: Array<Reservation>, transactions?: Array<Transaction>) {
    super();
    this.solde = solde
    this.prenom = prenom;
    this.adresse = adresse;
    this.preference = preference;
    this.reservations = reservations;
    this.transactions = transactions;
  }

}
