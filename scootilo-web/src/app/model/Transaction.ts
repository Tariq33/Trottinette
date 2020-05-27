import {Client} from "./client";

export class Transaction {
  id: number;
  version: number;
  montant: number;
  date: Date;
  numeroDeTransaction: string;
  client: Client;


  constructor(id?: number, version?: number, montant?: number, date?: Date, numeroDeTransaction?: string, client?: Client) {
    this.id = id;
    this.version = version;
    this.montant = montant;
    this.date = date;
    this.numeroDeTransaction = numeroDeTransaction;
    this.client = client;
  }
}
