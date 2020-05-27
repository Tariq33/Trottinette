import { Injectable } from '@angular/core';
import {MoyenDeTransport} from "../model/moyenDeTransport";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MoyenDeTransportService {

  private moyensDeTransport: Array<MoyenDeTransport> = new Array<MoyenDeTransport>();


  constructor(private http: HttpClient) {
    this.load();
  }

  findAll(): Array<MoyenDeTransport> {
    console.log(this.moyensDeTransport);
    return this.moyensDeTransport;
  }

  findById(id: number): Observable<MoyenDeTransport> {
    return this.http.get<MoyenDeTransport>("http://localhost:8080/moyendetransport/" + id);
  }

  create(moyenDeTransport: MoyenDeTransport) {
    return this.http.post<MoyenDeTransport>("http://localhost:8080/moyendetransport", moyenDeTransport);
  }

  modify(moyenDeTransport: MoyenDeTransport) {
    return this.http.put<MoyenDeTransport>("http://localhost:8080/moyendetransport/" + moyenDeTransport.id, moyenDeTransport);
  }

  deleteById(id: number) {
    this.http.delete("http://localhost:8080/moyendetransport/" + id).subscribe(resp => this.load(), error => console.log(error))
  }

  load() {
    this.http.get<Array<MoyenDeTransport>>("http://localhost:8080/moyendetransport").subscribe(resp => {
      this.moyensDeTransport = resp;
    }, error => console.log(error))
  }
}
