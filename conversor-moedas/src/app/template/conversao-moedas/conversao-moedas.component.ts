import { Component, OnInit } from '@angular/core';
import { ApiConversaoMoedasService } from 'src/app/service/conversaoMoedas/api-conversao-moedas.service';
import { HistoricoConversaoService } from 'src/app/service/historicoConversao/historico-conversao.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarConversaoComponent } from './snack-bar-conversao/snack-bar-conversao.component';
import { IMoedas } from 'src/app/interface/IMoedas';
import { IHistoricoConversao } from 'src/app/interface/IHistoricoConversao';


@Component({
  selector: 'app-conversao-moedas',
  templateUrl: './conversao-moedas.component.html',
  styleUrls: ['./conversao-moedas.component.css']
})
export class ConversaoMoedasComponent implements OnInit {

  simbolos: IMoedas[] = [];
  resConversao: IHistoricoConversao | null = null;

  constructor(private _snackBar: MatSnackBar, private api: ApiConversaoMoedasService, private historicoConversao: HistoricoConversaoService) {

  }

  ngOnInit() {
    this.api.getSimbolos()
      .subscribe(response => {
        this.simbolos = Object.values(response.symbols)
      });
  }

  converterMoeda() {
    const moedaOrigem = (<HTMLInputElement>document.getElementById("moeda-origem")).value;
    const moedaDestino = (<HTMLInputElement>document.getElementById("moeda-destino")).value;
    const valor = Number((<HTMLInputElement>document.getElementById("valor")).value)
    if (valor > 0) {
      this.api.converterMoeda(valor, moedaOrigem, moedaDestino)
        .subscribe(response => {
          let data : Date = new Date()
          this.resConversao = {
            data: data.toLocaleDateString(),
            hora: data.toLocaleTimeString(),
            valor: valor,
            moedaOrigem: moedaOrigem,
            moedaDestino: moedaDestino,
            rate: response.info.rate,
            result: response.result,
            altoValor: false
          };
          //verifica alto valor
          this.verificarAltoValorConvertido(this.resConversao)
          //msg confirmando conversao
          this.openSnackBar()
        });
    }
    this.showError(valor)
  }

  verificarAltoValorConvertido(resConversao: IHistoricoConversao) {
    //se moeda !USD
    if (resConversao.moedaDestino != "USD") {
      this.api.converterMoeda(resConversao.valor, resConversao.moedaDestino, "USD")
        .subscribe(response => {
          //valor > 10000 USD
          if (response.result > 10000) {
            //alto valor convertido
            resConversao.altoValor = true
          }
          //add conversao ao historico
          this.addHistoricoConversao(resConversao)
        });
    }
    //moeda == USD
    else {
      //valor > 10000 USD
      if (resConversao.valor > 10000) {
        resConversao.altoValor = true
      }
      //add conversao ao historico
      this.addHistoricoConversao(resConversao)
    }
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarConversaoComponent, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 5000,
    });
  }

  showError(valor: number | null) {
    const valorError = document.getElementById("valor-error")
    if (!valor || valor <= 0) {
      valorError?.classList.remove("d-none")
    } else {
      valorError?.classList.add("d-none")
    }

  }

  fecharResultadoConversao() {
    this.resConversao = null
  }

  addHistoricoConversao(resConversao: IHistoricoConversao) {
    this.historicoConversao.addConversao(resConversao)
  }
}
