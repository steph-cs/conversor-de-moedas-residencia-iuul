import { TestBed } from '@angular/core/testing';

import { SimbolosConversaoService } from './simbolos-conversao.service';

describe('SimbolosConversaoService', () => {
  let service: SimbolosConversaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimbolosConversaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
