import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Transaction} from "../model/Transaction";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private transactions: Array<Transaction> = new Array<Transaction>();


  constructor(private http: HttpClient) {
    this.load();
  }

  findAll(): Array<Transaction> {
    return this.transactions;
  }

  findById(id: number): Observable<Transaction> {
    return this.http.get<Transaction>("http://localhost:8080/transaction/" + id);
  }

  create(transaction: Transaction) {
    return this.http.post<Transaction>("http://localhost:8080/transaction", transaction);
  }

  modify(transaction: Transaction) {
    return this.http.put<Transaction>("http://localhost:8080/transaction/" + transaction.id, transaction);
  }

  deleteById(id: number) {
    this.http.delete("http://localhost:8080/transaction/" + id).subscribe(resp => this.load(), error => console.log(error))
  }

  load() {
    this.http.get<Array<Transaction>>("http://localhost:8080/transaction").subscribe(resp => {
      this.transactions = resp;
    }, error => console.log(error))
  }


}
