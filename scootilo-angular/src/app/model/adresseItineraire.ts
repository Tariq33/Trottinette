export class AdresseItineraire {
  rue: string;
  complement: string;
  codePostal: string;
  ville: string;
  longitude: number;
  latitude: number;

  constructor(rue?: string, complement?: string, codePostal?: string, ville?: string, longitude?: number, latitude?: number) {
    this.rue = rue;
    this.complement = complement;
    this.codePostal = codePostal;
    this.ville = ville;
    this.longitude = longitude;
    this.latitude = latitude;

  }
}
