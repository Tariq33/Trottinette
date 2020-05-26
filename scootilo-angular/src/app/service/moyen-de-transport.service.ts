import { Injectable } from '@angular/core';
import {MoyenDeTransport} from "../model/moyenDeTransport";

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

  findById(id: number): Observable<MoyenDeTransport> {
    return this.http.get<MoyenDeTransport>("http://localhost:8080/api/moyenDeTransport/" + id);
  }

  create(moyenDeTransport: MoyenDeTransport) {
    return this.http.post<MoyenDeTransport>("http://localhost:8080/api/moyenDeTransport", moyenDeTransport);
  }

  modify(moyenDeTransport: MoyenDeTransport) {
    return this.http.put<MoyenDeTransport>("http://localhost:8080/api/moyenDeTransport/" + moyenDeTransport.id, moyenDeTransport);
  }

  deleteById(id: number) {
    this.http.delete("http://localhost:8080/api/moyenDeTransport/" + id).subscribe(resp => this.load(), error => console.log(error))
  }

  load() {
    this.http.get<Array<MoyenDeTransport>>("http://localhost:8080/api/moyenDeTransport").subscribe(resp => {
      this.moyensDeTransport = resp;
    }, error => console.log(error))
  }
}
