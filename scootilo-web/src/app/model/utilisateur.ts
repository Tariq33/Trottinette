export class Utilisateur {
  id: number;
  version: number;
  nom: string;
  identifiant: string;
  motDePasse: string;
  confirmMotDePasse: String;
  email: string;
  compteValide: boolean;

  constructor(id?: number, version?: number, nom?: string, identifiant?: string, motDePasse?: string, email?: string, compteValide?: boolean, confirmMotDePasse?: string) {
    this.id = id;
    this.version = version;
    this.nom = nom;
    this.identifiant = identifiant;
    this.motDePasse = motDePasse;
    this.email = email;
    this.compteValide = compteValide
    this.confirmMotDePasse= confirmMotDePasse;

  }

}
