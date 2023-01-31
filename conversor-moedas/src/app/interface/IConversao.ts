export interface IConversao {
  motd: { msg: string, url: string },
  date: string,
  historical: boolean,
  info: { rate: number },
  query: { from: string, to: string, amount: number },
  result: number,
  success: boolean

}