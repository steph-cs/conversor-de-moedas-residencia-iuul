import { IHistoricoConversao } from "../interface/IHistoricoConversao";

export class MockResConversao {

  mockResConversao: IHistoricoConversao =
    {
      data: new Date().toLocaleDateString(),
      hora: new Date().toLocaleTimeString(),
      valor: 150,
      moedaOrigem: "BRL",
      moedaDestino: "USD",
      rate: 0.1942,
      result: 29.129951,
      altoValor: false
    }

}