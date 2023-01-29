import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiConversaoMoedasService {

  constructor(private http: HttpClient) {

  }

  getSimbolos() {
    let requestURL: string = 'https://api.exchangerate.host/symbols';
    return this.http.get(requestURL)
  }

  converterMoeda(valor: string, moedaOrigem: string, moedaDestino
    : string) {
    let requestURL = `https://api.exchangerate.host/convert?from=${moedaOrigem}&to=${moedaDestino}&amount=${valor}`;
    return this.http.get(requestURL)
  }

}
