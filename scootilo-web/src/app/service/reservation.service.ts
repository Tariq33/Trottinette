import { Injectable } from '@angular/core';
import {Reservation} from "../model/Reservation";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: Array<Reservation> = new Array<Reservation>();


  constructor(private http: HttpClient) {
    this.load();
  }

  findAll(): Array<Reservation> {
    return this.reservations;
  }

  findById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>("http://localhost:8080/api/reservation/" + id);
  }

  create(reservation: Reservation) {
    return this.http.post<Reservation>("http://localhost:8080/api/reservation", reservation);
  }

  modify(reservation: Reservation) {
    return this.http.put<Reservation>("http://localhost:8080/api/reservation/" + reservation.id, reservation);
  }

  deleteById(id: number) {
    this.http.delete("http://localhost:8080/api/reservation/" + id).subscribe(resp => this.load(), error => console.log(error))
  }

  load() {
    this.http.get<Array<Reservation>>("http://localhost:8080/api/reservation").subscribe(resp => {
      this.reservations = resp;
    }, error => console.log(error))
  }


}
