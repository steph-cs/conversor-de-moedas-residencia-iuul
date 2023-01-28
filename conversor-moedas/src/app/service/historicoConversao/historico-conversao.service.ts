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

  delConversao(conversao: string) {
    var historico = []
    var json: any;
    if (localStorage["historicoConversao"]) {
      json = localStorage.getItem("historicoConversao")
      historico = JSON.parse(json)
    }
    const index = historico.indexOf(conversao);
    if (index > -1) { // only splice array when item is found
      historico.splice(index, 1); // 2nd parameter means remove one item only
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
