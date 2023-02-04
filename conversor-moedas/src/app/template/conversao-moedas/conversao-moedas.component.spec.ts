import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MockApiService } from 'src/app/mock/MockApiConversaoService';
import { ApiConversaoMoedasService } from 'src/app/service/conversaoMoedas/api-conversao-moedas.service';

import { ConversaoMoedasComponent } from './conversao-moedas.component';

describe('ConversaoMoedasComponent', () => {
  let component: ConversaoMoedasComponent;
  let fixture: ComponentFixture<ConversaoMoedasComponent>;
  let service: ApiConversaoMoedasService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConversaoMoedasComponent],
      imports: [MatSnackBarModule,
        HttpClientModule
      ],
      providers: [{ provide: ApiConversaoMoedasService, useClass: MockApiService }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConversaoMoedasComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ApiConversaoMoedasService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Erro valor
  */

  it('should show an error message value less or equal than 0', () => {
    component.showError(-5)
    let error: HTMLElement = fixture.nativeElement.querySelectorAll('form span#valor-error')[0]
    expect(error.classList.contains('d-none')).toEqual(false)
  });

  it('should hide error message value greater than 0', () => {
    component.showError(15)
    let error: HTMLElement = fixture.nativeElement.querySelectorAll('form span#valor-error')[0]
    expect(error.classList.contains('d-none')).toEqual(true)
  });

  /**
   * Valor input
  */

  it('should load input ', () => {
    const inputs = (fixture.nativeElement.querySelectorAll('input'))
    expect(inputs.length).toBe(1);
  });

  it('should be able to set value of input', () => {
    const inputs = (fixture.nativeElement.querySelectorAll('input'))
    const input: HTMLInputElement = inputs[0];
    expect(input.value).toBe('');

    input.value = '150';

    expect(input.value).toBe('150');
  });

  it('should be able to get type of input', () => {
    const inputs = (fixture.nativeElement.querySelectorAll('input'))
    expect(inputs.length).toBe(1);
    const input: HTMLInputElement = inputs[0];
    expect(input.type).toBe('number');

  });

  /**
   * Selects simbolos
  */

  it('should load two selects ', () => {
    const selects = (fixture.nativeElement.querySelectorAll('select'))
    expect(selects.length).toBe(2);
  });

  it('should load select options ', () => {
    const optionsOrigem = (fixture.nativeElement.querySelectorAll('select#moeda-origem option'))
    expect(optionsOrigem.length).toBe(171);

    const optionsDestino = (fixture.nativeElement.querySelectorAll('select#moeda-destino option'))
    expect(optionsDestino.length).toBe(171);
  });

  it('should load default selects values BRL - USD ', () => {
    const selects = (fixture.nativeElement.querySelectorAll('select'))
    let select1: HTMLSelectElement = selects[0]
    let select2: HTMLSelectElement = selects[1]
    expect(select1.value).toEqual('BRL')
    expect(select2.value).toEqual('USD')
  });


});
