import {Reservation} from "./Reservation";

export class FinDeTrajet{
  id: number;
  version: number;
  photo: string;
  commentaire: string;
  reservation: Reservation;

  constructor(id?: number,version?: number, photo?: string, commentaire?: string, reservation?: Reservation) {
    this.id = id;
    this.version = version;
    this.photo = photo
    this.commentaire = commentaire;
    this.reservation = reservation;
  }

}
