import { Component, AfterViewInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HistoricoConversaoService } from 'src/app/service/historicoConversao/historico-conversao.service';


export interface Historico {
  data: string;
  hora: string;
  valor: string;
  moedaOrigem: string;
  moedaDestino: string;
  result: number;
  rate: number;
}

@Component({
  selector: 'app-historico-conversao',
  templateUrl: './historico-conversao.component.html',
  styleUrls: ['./historico-conversao.component.css']
})
export class HistoricoConversaoComponent implements AfterViewInit {

  displayedColumns: string[] = [
    'data',
    'hora',
    'valor',
    'moedaDestino',
    'moedaOrigem',
    'result',
    'rate'
  ];

  dataSource: any

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;



  constructor(private historicoConversao: HistoricoConversaoService) {
    this.getHistorico()
  }

  getHistorico() {
    let historico = this.historicoConversao.getHistorico()
    if (historico) {
      this.dataSource = new MatTableDataSource(historico)
    }else{
      this.dataSource = new MatTableDataSource([])
      
    }
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  delHistorico() {
    this.historicoConversao.delHistorico()
    this.refresh()
  }

  refresh() {
    this.getHistorico()
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
