import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiConversaoMoedasService } from './api-conversao-moedas.service';

describe('ApiConversaoMoedasService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [ApiConversaoMoedasService]
  }));

  it('should be created', () => {
    const service: ApiConversaoMoedasService = TestBed.get(ApiConversaoMoedasService);
    expect(service).toBeTruthy();
  });

  it('should have getData function', () => {
    const service: ApiConversaoMoedasService = TestBed.get(ApiConversaoMoedasService);
    expect(service.getSimbolos).toBeTruthy();
  });

});
