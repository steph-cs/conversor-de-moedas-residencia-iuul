import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiConversaoMoedasService } from './api-conversao-moedas.service';
import { MockApiService } from 'src/app/mock/MockApiConversaoService';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('ApiConversaoMoedasService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: ApiConversaoMoedasService;

  beforeEach(() => {
    let httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiConversaoMoedasService,
        {provide: HttpClient , useValue: httpClientSpyObj}
      ]
    })
    service = TestBed.inject(ApiConversaoMoedasService);
    httpClientSpy = <jasmine.SpyObj<HttpClient>>TestBed.inject(HttpClient)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have getSimbolos function', () => {
    expect(service.getSimbolos).toBeTruthy();
  });

  it('should have converterMoeda function', () => {
    expect(service.converterMoeda).toBeTruthy();
  });

  it('should return expected symbols (HttpClient called once)', (done: DoneFn) => {
    let mockData = new MockApiService().mockApiServiceSimbolos
    console.log(httpClientSpy)
    httpClientSpy.get.and.returnValue(of(mockData))

    service.getSimbolos().subscribe({
      next: simbolos => {
        expect(simbolos).toEqual(mockData);
        done();
      },
      error: () => {
        done.fail
      } 
    });
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1)
  });
  
  it('should return expected currency (HttpClient called once)', (done: DoneFn) => {
    let mockData = new MockApiService().mockApiServiceConversao
    console.log(httpClientSpy)
    httpClientSpy.get.and.returnValue(of(mockData))

    service.converterMoeda(150, "BRL", "USD").subscribe({
      next: simbolos => {
        expect(simbolos).toEqual(mockData);
        done();
      },
      error: () => {
        done.fail
      } 
    });
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1)
  });
});
