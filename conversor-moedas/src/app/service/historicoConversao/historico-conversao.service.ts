import { Injectable } from '@angular/core';
import { IHistoricoConversao } from 'src/app/interface/IHistoricoConversao';

@Injectable({
  providedIn: 'root'
})


export class HistoricoConversaoService {

  constructor() {

  }

  getHistorico() : IHistoricoConversao[] {
    var historico: IHistoricoConversao[];
    var json: any;
    json = localStorage.getItem("historicoConversao")
    historico = JSON.parse(json)
    return historico
  }

  addConversao(conversao: IHistoricoConversao) {
    var historico : IHistoricoConversao[] = []
    var json: any;
    if (localStorage["historicoConversao"]) {
      json = localStorage.getItem("historicoConversao")
      historico = JSON.parse(json)
    }
    historico.push(conversao)
    json = JSON.stringify(historico)
    localStorage.setItem("historicoConversao", json)
  }

  delConversao(index: number) {
    var historico: IHistoricoConversao[] = []
    var json: any;
    if (localStorage["historicoConversao"]) {
      json = localStorage.getItem("historicoConversao")
      historico = JSON.parse(json)
    }
    if (index > -1) {
      historico.splice(index, 1);
    }
    json = JSON.stringify(historico)
    localStorage.setItem("historicoConversao", json)
  }

  delHistorico() {
    if (localStorage["historicoConversao"]) {
      localStorage.removeItem("historicoConversao")
    }
  }
}
