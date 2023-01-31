import { Component, AfterViewInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiConversaoMoedasService } from 'src/app/service/conversaoMoedas/api-conversao-moedas.service';
import { HistoricoConversaoService } from 'src/app/service/historicoConversao/historico-conversao.service';

import { MatDialog } from '@angular/material/dialog';
import { ModalExcluirHistoricoComponent } from './modal-excluir-historico/modal-excluir-historico.component';
import { ModalExcluirConversaoComponent } from './modal-excluir-conversao/modal-excluir-conversao.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarExclusaoComponent } from './snack-bar-exclusao/snack-bar-exclusao.component';
import { IHistoricoConversao } from 'src/app/interface/IHistoricoConversao';

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

  historico : IHistoricoConversao[] = []
  dataSource: MatTableDataSource<IHistoricoConversao> = new MatTableDataSource(this.historico);

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog, private api: ApiConversaoMoedasService, private historicoConversao: HistoricoConversaoService) {
    this.getHistorico()
  }

  getHistorico() {
    let historico = this.historicoConversao.getHistorico()
    this.dataSource.data = historico 
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
