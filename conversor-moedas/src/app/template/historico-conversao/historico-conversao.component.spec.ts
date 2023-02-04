import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockHistoricoConversaoService } from 'src/app/mock/MockHistoricoConversaoService';
import { HistoricoConversaoService } from 'src/app/service/historicoConversao/historico-conversao.service';

import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { HarnessLoader } from '@angular/cdk/testing';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonHarness } from '@angular/material/button/testing';
import { of } from 'rxjs';

import { HistoricoConversaoComponent } from './historico-conversao.component';
import { OverlayContainer } from '@angular/cdk/overlay';

describe('HistoricoConversaoComponent', () => {
  let component: HistoricoConversaoComponent;
  let fixture: ComponentFixture<HistoricoConversaoComponent>;
  let service: HistoricoConversaoService;
  let loader: HarnessLoader;
  let overlayContainer: OverlayContainer;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoricoConversaoComponent],
      imports: [
        BrowserAnimationsModule,
        MatSnackBarModule,
        MatDialogModule,
        HttpClientModule,
        MatPaginatorModule,
        MatTableModule,
        MatButtonModule
      ],
      providers: [
        {
          provide: HistoricoConversaoService,
          useClass: MockHistoricoConversaoService
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HistoricoConversaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(HistoricoConversaoService)
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    overlayContainer = TestBed.inject(OverlayContainer);
  });


  afterEach(async () => {
    const dialogs = await loader.getAllHarnesses(MatDialogHarness);

    await Promise.all(dialogs.map(async (d: MatDialogHarness) => await d.close()));
    overlayContainer.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Table 
  */
  it('should load a table', () => {
    const tables = fixture.nativeElement.querySelectorAll("table")
    expect(tables.length).toBe(1);
  });

  it('should get the different kinds of rows in the table', () => {

    // Header row
    let headerRows = (fixture.nativeElement.querySelectorAll('table thead tr'))
    expect(headerRows.length).toBe(1);
    let headerRow = headerRows[0];

    expect(headerRow.cells[0].innerHTML).toBe("Data")
    expect(headerRow.cells[1].innerHTML).toBe("Hora")
    expect(headerRow.cells[2].innerHTML).toBe("Valor")
    expect(headerRow.cells[3].innerHTML).toBe("Moeda Origem")
    expect(headerRow.cells[4].innerHTML).toBe("Moeda Destino")
    expect(headerRow.cells[5].innerHTML).toBe("Resultado")
    expect(headerRow.cells[6].innerHTML).toBe("Taxa")
    expect(headerRow.cells[7].innerHTML).toBe("Excluir")

    // Data rows
    let tableRows = (fixture.nativeElement.querySelectorAll('table tbody tr'))
    expect(tableRows.length).toBe(3);

  });

  /**
   * Paginator
  */
  it('should be able to navigate between pages', () => {
    const paginator: MatPaginator = component.paginator
    expect(paginator.pageIndex).toBe(0)
    paginator.nextPage()
    expect(paginator.pageIndex).toBe(0)
    paginator.previousPage()
    expect(paginator.pageIndex).toBe(0)
  });

  it('should be able to go to the last page', () => {
    const paginator: MatPaginator = component.paginator
    //3 rows = 1 pagina
    expect(paginator.pageIndex).toBe(0);
    paginator.lastPage();
    expect(paginator.pageIndex).toBe(0);
  });

  it('should be able to set the page size', () => {
    const paginator: MatPaginator = component.paginator
    expect(paginator.pageSize).toBe(5);
    paginator.pageSize = 25;
    expect(component.dataSource.paginator?.pageSize).toBe(25);

  });

  /**
   * Icone alto valor 
  */
  it('should display an icon for high currencies ', () => {
    let historico = service.getHistorico()
    for (let i = 0; i < historico.length; i++) {
      let res: HTMLElement = fixture.nativeElement.querySelector(`#res${i}`)
      if (historico[i].altoValor) {
        expect(res.children.length).toEqual(1)
      } else {
        expect(res.children.length).toEqual(0)
      }
    }
  });

  /**
   * Dialog historico
   */
  it('should load harness for dialog', async () => {
    component.openDialogExcluirHistorico();
    const dialogs = await loader.getAllHarnesses(MatDialogHarness);
    expect(dialogs.length).toBe(1);
  });

  it('should be able to close dialog', async () => {
    component.openDialogExcluirHistorico();
    let dialogs = await loader.getAllHarnesses(MatDialogHarness);

    expect(dialogs.length).toBe(1);
    await dialogs[0].close();

    dialogs = await loader.getAllHarnesses(MatDialogHarness);
    expect(dialogs.length).toBe(0);

  });

    /**
   * Dialog conversao
   */
    it('should load harness for dialog', async () => {
      component.openDialogExcluirConversao(0);
      const dialogs = await loader.getAllHarnesses(MatDialogHarness);
      expect(dialogs.length).toBe(1);
    });
  
    it('should be able to close dialog', async () => {
      component.openDialogExcluirConversao(0);
      let dialogs = await loader.getAllHarnesses(MatDialogHarness);
  
      expect(dialogs.length).toBe(1);
      await dialogs[0].close();
  
      dialogs = await loader.getAllHarnesses(MatDialogHarness);
      expect(dialogs.length).toBe(0);
  
    });

  /**
   * Exclusao historico 
  */
  it('should call openDialog', () => {

  })


  /**
   * Exclusao conversao 
  */
  it('should ', () => { });
});
