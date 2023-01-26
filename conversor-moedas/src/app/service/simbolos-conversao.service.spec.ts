import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiConversaoMoedas } from './api-conversao-moedas';

describe('ApiConversaoMoedas', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [ApiConversaoMoedas]
  }));

  it('should be created', () => {
    const service: ApiConversaoMoedas = TestBed.get(ApiConversaoMoedas);
    expect(service).toBeTruthy();
  });

  it('should have getData function', () => {
    const service: ApiConversaoMoedas = TestBed.get(ApiConversaoMoedas);
    expect(service.getSimbolos).toBeTruthy();
  });

});
