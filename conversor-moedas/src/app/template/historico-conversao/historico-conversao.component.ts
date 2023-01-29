import { Component, AfterViewInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiConversaoMoedas } from 'src/app/service/api-conversao-moedas';
import { HistoricoConversaoService } from 'src/app/service/historicoConversao/historico-conversao.service';

import { MatDialog } from '@angular/material/dialog';
import { ModalExcluirHistoricoComponent } from './modal-excluir-historico/modal-excluir-historico.component';
import { ModalExcluirConversaoComponent } from './modal-excluir-conversao/modal-excluir-conversao.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarExclusaoComponent } from './snack-bar-exclusao/snack-bar-exclusao.component';

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
    'moedaOrigem',
    'moedaDestino',
    'result',
    'rate',
    'excluir'
  ];

  dataSource: any

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;


  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog, private api: ApiConversaoMoedas, private historicoConversao: HistoricoConversaoService) {
    this.getHistorico()
  }

  getHistorico() {
    let historico = this.historicoConversao.getHistorico()
    if (historico) {
      this.dataSource = new MatTableDataSource(historico)
    } else {
      this.dataSource = new MatTableDataSource([])

    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.verificarAltoValorConvertido()
  }

  delHistorico() {
    this.historicoConversao.delHistorico()
    this.refresh()
    this.openSnackBar()
  }

  delConversao(index: number) {
    this.historicoConversao.delConversao(index)
    this.refresh()
    this.openSnackBar()
  }

  refresh() {
    this.getHistorico()
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.verificarAltoValorConvertido()
  }

  verificarAltoValorConvertido() {
    this.dataSource.data.forEach(
      (row: { result: any; moedaDestino: any; }) => {
        let i = this.dataSource.data.indexOf(row)
        let valor = row.result
        let moeda = row.moedaDestino;
        if (moeda != "USD") {
          var res: any;
          this.api.converterMoeda(valor.toString(), moeda, "USD")
            .subscribe(response => {
              res = response
              if (res.result > 10000) {
                this.exibirIconeAltoValorConvertido(valor, i)
              }
            });
        }
      }
    );

  }

  exibirIconeAltoValorConvertido(valor: number, index: number) {
    let html = <HTMLInputElement>document.getElementById(`res${index}`)
    if (html) {
      html.innerHTML = `${valor} <i title="Valor convertido maior que 10.000 USD" class="bi bi-exclamation-diamond-fill text-warning"></i>`
    }

  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarExclusaoComponent, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 5000,
    });
  }

  openDialogExcluirHistorico() {
    const dialogRef = this.dialog.open(ModalExcluirHistoricoComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delHistorico()
      }
    });

  }

  openDialogExcluirConversao(index: number) {
    const dialogRef = this.dialog.open(ModalExcluirConversaoComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delConversao(index)
      }
    });

  }
}
