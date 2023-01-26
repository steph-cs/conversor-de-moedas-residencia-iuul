import { Component, OnInit } from '@angular/core';
import { ApiConversaoMoedas } from 'src/app/service/api-conversao-moedas';

@Component({
  selector: 'app-conversao-moedas',
  templateUrl: './conversao-moedas.component.html',
  styleUrls: ['./conversao-moedas.component.css']
})
export class ConversaoMoedasComponent implements OnInit {

  simbolos: any;
  resConversao: any;

  constructor(private api: ApiConversaoMoedas) {

  }

  ngOnInit() {
    this.api.getSimbolos()
      .subscribe(response => {
        this.simbolos = response;
        this.simbolos = this.simbolos.symbols
        this.simbolos = Object.values(this.simbolos)
      });

  }

  converterMoeda() {
    const moedaOrigem = (<HTMLInputElement>document.getElementById("moeda-origem")).value;
    const moedaDestino = (<HTMLInputElement>document.getElementById("moeda-destino")).value;
    const valor = (<HTMLInputElement>document.getElementById("valor")).value

    this.api.converterMoeda(valor, moedaOrigem, moedaDestino)
      .subscribe(response => {
        this.resConversao = response;
        this.resConversao = { rate: this.resConversao.info.rate, result: this.resConversao.result };
      });
  }
}
