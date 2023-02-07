import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockApiService } from 'src/app/mock/MockApiConversaoService';
import { MockResConversao } from 'src/app/mock/MockResConversao';
import { ApiConversaoMoedasService } from 'src/app/service/conversaoMoedas/api-conversao-moedas.service';

import { ConversaoMoedasComponent } from './conversao-moedas.component';

describe('ConversaoMoedasComponent', () => {
  let component: ConversaoMoedasComponent;
  let fixture: ComponentFixture<ConversaoMoedasComponent>;
  let service: ApiConversaoMoedasService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConversaoMoedasComponent],
      imports: [
        BrowserAnimationsModule,
        MatSnackBarModule,
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
   * Erro msg 
  */
  it('should be able to convert only values greater than 0', () => {
    const inputs = (fixture.nativeElement.querySelectorAll('input'))
    const input: HTMLInputElement = inputs[0];
    expect(input.value).toBe('');

    //valor > 0
    input.value = '1';
    expect(input.value).toBe('1');

    //msg erro = n exibida
    component.converterMoeda();
    let error: HTMLElement = fixture.nativeElement.querySelectorAll('form span#valor-error')[0]
    expect(error.classList.contains('d-none')).toEqual(true)
  });

  it('should show error message value equal 0', () => {
    const inputs = (fixture.nativeElement.querySelectorAll('input'))
    const input: HTMLInputElement = inputs[0];
    expect(input.value).toBe('');

    //valor == 0
    input.value = '0';
    expect(input.value).toBe('0');

    //msg erro = exibida
    component.converterMoeda();
    let error: HTMLElement = fixture.nativeElement.querySelectorAll('form span#valor-error')[0]
    expect(error.classList.contains('d-none')).toEqual(false)
  });

  it('should show error message value less than 0', () => {
    const inputs = (fixture.nativeElement.querySelectorAll('input'))
    const input: HTMLInputElement = inputs[0];
    expect(input.value).toBe('');

    //valor < 0
    input.value = '-1';
    expect(input.value).toBe('-1');

    //msg erro = exibida
    component.converterMoeda();
    let error: HTMLElement = fixture.nativeElement.querySelectorAll('form span#valor-error')[0]
    expect(error.classList.contains('d-none')).toEqual(false)

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


  /**
   * Resultado conversao 
  */

  it('should be able to convert only values greater than 0', () => {
    const inputs = (fixture.nativeElement.querySelectorAll('input'))
    const input: HTMLInputElement = inputs[0];
    expect(input.value).toBe('');

    //valor > 0
    input.value = '150';
    expect(input.value).toBe('150');

    //msg erro = n exibida
    component.converterMoeda();
    let error: HTMLElement = fixture.nativeElement.querySelectorAll('form span#valor-error')[0]
    expect(error.classList.contains('d-none')).toEqual(true)

    //exibido div #resConversao ; resConversao: IHistoricoConversao
    let resConversao: HTMLElement = fixture.nativeElement.querySelector('#resConversao')
    let mockData = new MockResConversao().mockResConversao
    expect(resConversao).toBeDefined()
    expect(component.resConversao).toEqual(mockData)
  });

  it('should dont convert value less than 0', () => {
    const inputs = (fixture.nativeElement.querySelectorAll('input'))
    const input: HTMLInputElement = inputs[0];
    expect(input.value).toBe('');

    //valor > 0
    input.value = '0';
    expect(input.value).toBe('0');

    //msg erro = n exibida
    component.converterMoeda();
    let error: HTMLElement = fixture.nativeElement.querySelectorAll('form span#valor-error')[0]
    expect(error.classList.contains('d-none')).toEqual(false)

    //n exibido div #resConversao ; resConversao = null
    let resConversao: HTMLElement = fixture.nativeElement.querySelector('#resConversao')
    expect(resConversao).toBeNull()
    expect(component.resConversao).toBeNull()
  });

});
