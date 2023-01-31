export interface IHistoricoConversao {
  data: string,
  hora: string,
  valor: number,
  moedaOrigem: string,
  moedaDestino: string,
  rate: number,
  result: number,
  altoValor: boolean
}