
import { IHistoricoConversao } from 'src/app/interface/IHistoricoConversao';

export class MockHistoricoConversaoService {

  mockHistoricoConversao: IHistoricoConversao[] = [
    {
      data: "04/02/2023",
      hora: "10:30:50",
      valor: 150,
      moedaOrigem: "BRL",
      moedaDestino: "USD",
      rate: 0.1942,
      result: 29.129951,
      altoValor: false
    },
    {
      data: "04/02/2023",
      hora: "10:30:50",
      valor: 75000,
      moedaOrigem: "BRL",
      moedaDestino: "EUR",
      rate: 0.179666,
      result: 13474.938403,
      altoValor: true
    },
    {
      data: "04/02/2023",
      hora: "10:30:50",
      valor: 100000,
      moedaOrigem: "BRL",
      moedaDestino: "USD",
      rate: 0.1942,
      result: 19420.041021,
      altoValor: true
    }

  ]
  getHistorico(): IHistoricoConversao[] {
    return this.mockHistoricoConversao
  }

  delHistorico() {
    this.mockHistoricoConversao = []
  }

  delConversao(index: number) {
    this.mockHistoricoConversao.splice(index, 1);
  }

  refresh() {
  }

  openSnackBar() {

  }

  openDialogExcluirHistorico() {

  }

  openDialogExcluirConversao(index: number) {

  }

}