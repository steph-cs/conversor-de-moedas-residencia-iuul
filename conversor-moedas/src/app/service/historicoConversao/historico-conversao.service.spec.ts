import { TestBed } from '@angular/core/testing';
import { IHistoricoConversao } from 'src/app/interface/IHistoricoConversao';
import { MockHistoricoConversaoService } from 'src/app/mock/MockHistoricoConversaoService';

import { HistoricoConversaoService } from './historico-conversao.service';

describe('HistoricoConversaoService', () => {
  let service: HistoricoConversaoService;
  let localStore: { [key: string]: string }
  let mockHistorico: MockHistoricoConversaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    localStore = {};

    spyOn(window.localStorage, 'getItem').and.callFake((key) =>
      key in localStore ? localStore[key] : null
    );
    spyOn(window.localStorage, 'setItem').and.callFake(
      (key, value) => (localStore[key] = value)
    );

    service = TestBed.inject(HistoricoConversaoService);
    mockHistorico = new MockHistoricoConversaoService()
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store the currency in localStorage', () => {
    //add 1 conversao
    service.addConversao(mockHistorico.mockHistoricoConversao[0]);

    //recebe historico + push conversao 2
    var historico: IHistoricoConversao[] = []
    var json: any;

    json = localStorage.getItem('historicoConversao')
    historico = JSON.parse(json)

    historico.push(mockHistorico.mockHistoricoConversao[1])
    json = JSON.stringify(historico)
    localStorage.setItem("historicoConversao", json)

    json = JSON.stringify(mockHistorico.mockHistoricoConversao.slice(0,2))
    expect(localStorage.getItem('historicoConversao')).toEqual(json);
  });

  it('should get currencies on localStorage', () => {
    let json = JSON.stringify(mockHistorico.mockHistoricoConversao)
    localStorage.setItem('historicoConversao', json);
    expect(service.getHistorico()).toEqual(mockHistorico.mockHistoricoConversao);
  });

  it('should delete the currency in localStorage', () => {
    let json = JSON.stringify([mockHistorico.mockHistoricoConversao[0]])
    //add 1 conversao
    service.addConversao(mockHistorico.mockHistoricoConversao[0]);
    expect(localStorage.getItem('historicoConversao')).toEqual(json);
    //del 1 conversao
    service.delConversao(0)
    expect(localStorage.getItem('historicoConversao')).toEqual('[]')
  });

  it('should clear the localStorage', () => {
    service.delHistorico()
    expect(localStorage.getItem('historicoConversao')).toBeNull()
  });


});
