import { IMoedas } from "./IMoedas";

export interface ISimbolos{
  motd : {msg: string, url : string},
  success : boolean,
  symbols : IMoedas[]
}