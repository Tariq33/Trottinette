export class Utilisateur {
  id: number;
  version: number;
  nom: string;
  identifiant: string;
  motDePasse: string;
  email: string;
  compteValide: boolean;

  constructor(id?: number, version?: number, nom?: string, identifiant?: string, motDePasse?: string, email?: string, compteValide?: boolean) {
    this.id = id;
    this.version = version;
    this.nom = nom;
    this.identifiant = identifiant;
    this.motDePasse = motDePasse;
    this.email = email;
    this.compteValide = compteValide;

  }

}
