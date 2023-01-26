import { Component, OnInit } from '@angular/core';
import { SimbolosConversaoService } from 'src/app/service/simbolos-conversao.service';

@Component({
  selector: 'app-conversao-moedas',
  templateUrl: './conversao-moedas.component.html',
  styleUrls: ['./conversao-moedas.component.css']
})
export class ConversaoMoedasComponent implements OnInit {

  simbolos: any;

  constructor(private api: SimbolosConversaoService) {

  }

  ngOnInit() {
    this.api.getSimbolos()
      .subscribe(response => {
        this.simbolos = response;
        this.simbolos = this.simbolos.symbols
        this.simbolos = Object.values(this.simbolos)
      });

  }

}
