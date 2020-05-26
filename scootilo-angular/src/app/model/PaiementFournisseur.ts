export class PaiementFournisseur {
  id: number;
  version: number;
  montant: number;
  Date: Date;
  numeroDeTransaction: String;
  itineraire: Itineraire;
  fournisseur: Fournisseur;


  constructor(id?: number, version?: number, montant?: number, Date?: Date, numeroDeTransaction?: String, itineraire?: Itineraire, fournisseur?: Fournisseur) {
    this.id = id;
    this.version = version;
    this.montant = montant;
    this.Date = Date;
    this.numeroDeTransaction = numeroDeTransaction;
    this.itineraire = itineraire;
    this.fournisseur = fournisseur;
  }
}
