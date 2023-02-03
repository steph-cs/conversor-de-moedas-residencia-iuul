import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ListarSimbolosComponent } from './listar-simbolos.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ApiConversaoMoedasService } from 'src/app/service/conversaoMoedas/api-conversao-moedas.service';
import { MockApiService } from 'src/app/mock/MockApiConversaoService';
import { By } from '@angular/platform-browser';

describe('ListarSimbolosComponent', () => {
  let component: ListarSimbolosComponent;
  let fixture: ComponentFixture<ListarSimbolosComponent>;
  let service: ApiConversaoMoedasService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarSimbolosComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatTableModule,
        MatInputModule
      ],
      providers: [
        ListarSimbolosComponent,
        { provide: ApiConversaoMoedasService, useClass: MockApiService },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListarSimbolosComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ApiConversaoMoedasService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Table
   * 
  */
  it('should load a table', () => {
    const tables = fixture.debugElement.queryAll(By.css("table"))
    expect(tables.length).toBe(1);
  });

  it('should get the different kinds of rows in the table', () => {

    // Header row
    let headerRows = (fixture.nativeElement.querySelectorAll('table thead tr'))
    expect(headerRows.length).toBe(1);
    let headerRow = headerRows[0];

    expect(headerRow.cells[0].innerHTML).toBe("Código")
    expect(headerRow.cells[1].innerHTML).toBe("Descrição")

    // Data rows
    let tableRows = (fixture.nativeElement.querySelectorAll('table tbody tr'))
    expect(tableRows.length).toBe(171);

  });

  it('should filter the dataSource', () => {

    const input: HTMLInputElement = (fixture.nativeElement.querySelectorAll('input'))[0]
    input.value = "EUR"
    input.dispatchEvent(new KeyboardEvent('keyup'))
    expect(component.dataSource.filter).toBe('eur');
    let res = component.dataSource._filterData(component.dataSource.data)
    expect(res).toEqual([{ description: "Euro", code: "EUR" }])

  });

  /**
   * Paginator
  */

  it('should be able to navigate between pages', () => {
    const paginator: MatPaginator = component.paginator

    expect(paginator.pageIndex).toBe(0)
    paginator.nextPage()
    expect(paginator.pageIndex).toBe(1)
    paginator.previousPage()
    expect(paginator.pageIndex).toBe(0)
  });

  it('should be able to go to the last page', () => {
    const paginator: MatPaginator = component.paginator
    //171 rows = 35 paginas
    expect(paginator.pageIndex).toBe(0);
    paginator.lastPage();
    expect(paginator.pageIndex).toBe(34);
  });

  it('should be able to set the page size', () => {
    const paginator: MatPaginator = component.paginator

    expect(paginator.pageSize).toBe(5);
    paginator.pageSize = 25;
    expect(component.dataSource.paginator?.pageSize).toBe(25);

  });

  /**
   * Filter input
   */

  it('should load input ', () => {
    const inputs = (fixture.nativeElement.querySelectorAll('input'))
    expect(inputs.length).toBe(1);
  });

  it('should be able to set value of input', () => {
    const inputs = (fixture.nativeElement.querySelectorAll('input'))
    const input: HTMLInputElement = inputs[0];
    expect(input.value).toBe('');

    input.value = 'CAD';

    expect(input.value).toBe('CAD');
  });

  it('should be able to get type of input', () => {
    const inputs = (fixture.nativeElement.querySelectorAll('input'))
    expect(inputs.length).toBe(1);
    const input: HTMLInputElement = inputs[0];
    expect(input.type).toBe('text');

  });

});
