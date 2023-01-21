import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SimbolosConversaoService } from './simbolos-conversao.service';

describe('SimbolosConversaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [SimbolosConversaoService]
  }));

  it('should be created', () => {
    const service: SimbolosConversaoService = TestBed.get(SimbolosConversaoService);
    expect(service).toBeTruthy();
  });

  it('should have getData function', () => {
    const service: SimbolosConversaoService = TestBed.get(SimbolosConversaoService);
    expect(service.getSimbolos).toBeTruthy();
  });

});
