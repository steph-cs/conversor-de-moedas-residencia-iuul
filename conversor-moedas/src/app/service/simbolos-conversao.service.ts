import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SimbolosConversaoService {
  private requestURL: string = 'https://api.exchangerate.host/symbols';

  constructor(private http: HttpClient) {
  
  }

  getSimbolos(){
    return this.http.get(this.requestURL)
  }

}
