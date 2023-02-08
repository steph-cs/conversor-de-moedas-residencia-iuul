import { TestBed } from '@angular/core/testing';
import { IHistoricoConversao } from 'src/app/interface/IHistoricoConversao';
import { MockHistoricoConversaoService } from 'src/app/mock/MockHistoricoConversaoService';

import { HistoricoConversaoService } from './historico-conversao.service';

describe('HistoricoConversaoService', () => {
  let service: HistoricoConversaoService;
  let mockHistorico: MockHistoricoConversaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.inject(HistoricoConversaoService);
    mockHistorico = new MockHistoricoConversaoService()
    localStorage.clear();
  });



  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store the currency in localStorage', () => {
    //add conversoes
    service.addConversao(mockHistorico.mockHistoricoConversao[0]);
    service.addConversao(mockHistorico.mockHistoricoConversao[1]);
    service.addConversao(mockHistorico.mockHistoricoConversao[2]);

    let json = JSON.stringify(mockHistorico.mockHistoricoConversao)
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
    //add conversoes
    let json = JSON.stringify(mockHistorico.mockHistoricoConversao)
    localStorage.setItem('historicoConversao', json);

    //del historico
    service.delHistorico()
    expect(localStorage.getItem('historicoConversao')).toEqual('[]')
  });


});
