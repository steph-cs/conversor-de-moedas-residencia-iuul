import { Component, OnInit } from '@angular/core';
import { ApiConversaoMoedas } from 'src/app/service/api-conversao-moedas';
import { HistoricoConversaoService } from 'src/app/service/historicoConversao/historico-conversao.service';

import {MatSnackBar} from '@angular/material/snack-bar';
import { SnackBarConversaoComponent } from './snack-bar-conversao/snack-bar-conversao.component';


@Component({
  selector: 'app-conversao-moedas',
  templateUrl: './conversao-moedas.component.html',
  styleUrls: ['./conversao-moedas.component.css']
})
export class ConversaoMoedasComponent implements OnInit {

  simbolos: any;
  resConversao: any;

  constructor(private _snackBar: MatSnackBar, private api: ApiConversaoMoedas, private historicoConversao: HistoricoConversaoService) {

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
    if (valor) {
      this.api.converterMoeda(valor, moedaOrigem, moedaDestino)
        .subscribe(response => {
          this.resConversao = response;
          let data = new Date()
          this.resConversao = {
            data: data.toLocaleDateString(),
            hora: data.toLocaleTimeString(),
            valor: valor,
            moedaOrigem: moedaOrigem,
            moedaDestino: moedaDestino,
            rate: this.resConversao.info.rate, result: this.resConversao.result
          };
          //add conversao ao historico
          this.addHistoricoConversao()
          //msg confirmando conversao
          this.openSnackBar()
        });
    }
    this.showError(valor)
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarConversaoComponent, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 5000,
    });
  }

  showError(valor: string | null) {
    const valorError = document.getElementById("valor-error")
    if (!valor) {
      valorError?.classList.remove("d-none")
    }else{
      valorError?.classList.add("d-none")
    }

  }

  fecharResultadoConversao(){
    this.resConversao = null
  }

  addHistoricoConversao(){
    this.historicoConversao.addConversao(this.resConversao)
  }
}
