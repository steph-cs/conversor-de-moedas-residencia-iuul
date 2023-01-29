import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class HistoricoConversaoService {

  constructor() {

  }

  getHistorico() {
    var historico: any;
    var json: any;
    json = localStorage.getItem("historicoConversao")
    historico = JSON.parse(json)
    return historico
  }

  addConversao(conversao: object) {
    var historico = []
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
    var historico = []
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
