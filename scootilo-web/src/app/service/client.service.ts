  import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client} from "../model/client";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private clients: Array<Client> = new Array<Client>();

  constructor(private http: HttpClient) {
    this.load();
  }

  findAll(): Array<Client> {
    return this.clients;
  }

  findById(id: number): Observable<Client> {
    return this.http.get<Client>('http://localhost:8080/client/' + id);
  }

  FindHistorique(id: number): Observable<Array<undefined>> {
    return this.http.get<Array<undefined>>('http://localhost:8080/client/historique/' + id);
  }

  create(client: Client) {
    return this.http.post<Client>('http://localhost:8080/client', client);
  }

  modify(client: Client) {
    return this.http.put<Client>('http://localhost:8080/client/' + client.id, client);
  }

  deleteById(id: number) {
    this.http.delete('http://localhost:8080/client/' + id).subscribe(resp => this.load(), error => console.log(error));
  }

  load() {
    this.http.get<Array<Client>>('http://localhost:8080/client').subscribe(resp => {
      this.clients = resp;
    }, error => console.log(error));
  }
}
