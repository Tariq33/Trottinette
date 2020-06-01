import { Injectable } from '@angular/core';
import {MoyenDeTransport} from "../model/moyenDeTransport";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {TypeDeTransport} from "../model/type-de-transport.enum";
// import {TypeDeTransport} from "../model/TypeDeTransport";

@Injectable({
  providedIn: 'root'
})
export class MoyenDeTransportService {

  private moyensDeTransport: Array<MoyenDeTransport> = new Array<MoyenDeTransport>();

  constructor(private http: HttpClient) {
    this.load();
  }

  findAll(): Array<MoyenDeTransport> {
    return this.moyensDeTransport;
  }

  findAllMoyObs(): Observable<Array<MoyenDeTransport>> {
    return this.http.get<Array<MoyenDeTransport>>("http://localhost:8080/moyendetransport");
  }

  findById(id: number): Observable<MoyenDeTransport> {
    return this.http.get<MoyenDeTransport>("http://localhost:8080/moyendetransport/" + id);
  }

  findAllByFournisseur(nom: string): Observable<Array<MoyenDeTransport>> {
    return this.http.get<Array<MoyenDeTransport>>("http://localhost:8080/moyendetransport/by-fournisseur/" + nom);
  }

  FindAllTransportsInArea(latitude: number, longitude: number): Observable<Array<undefined>> {
    return this.http.get<Array<undefined>>("http://localhost:8080/moyendetransport/area/" + latitude + ":"+ longitude);
  }

  FindAllTransportsByType(typeDeTransport: TypeDeTransport): Observable<Array<MoyenDeTransport>> {
    return this.http.get<Array<MoyenDeTransport>>("http://localhost:8080/moyendetransport/by-type/"+ typeDeTransport);
  }

  FindAllPerso(): Observable<Array<MoyenDeTransport>> {
    return this.http.get<Array<MoyenDeTransport>>("http://localhost:8080/moyendetransport/findallperso/");
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
