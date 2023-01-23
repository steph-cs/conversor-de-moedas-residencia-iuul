import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { SimbolosConversaoService } from 'src/app/service/simbolos-conversao.service';

export interface Simbolos {
  code: string;
  description: string;
}

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-listar-simbolos',
  templateUrl: './listar-simbolos.component.html',
  styleUrls: ['./listar-simbolos.component.css']
})
export class ListarSimbolosComponent implements OnInit {
  displayedColumns: string[] = ['code', 'description'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  simbolos: any;
  constructor(private api: SimbolosConversaoService) {

  }

  ngOnInit() {
    this.api.getSimbolos()
      .subscribe(response => {
        this.simbolos = response;
        this.simbolos = this.simbolos.symbols
        this.simbolos = Object.values(this.simbolos)
        this.dataSource = new MatTableDataSource(this.simbolos);
  
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
