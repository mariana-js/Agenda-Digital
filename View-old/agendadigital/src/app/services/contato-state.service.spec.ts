import { TestBed } from '@angular/core/testing';

import { ContatoStateService } from './contato-state.service';

describe('ContatoStateService', () => {
  let service: ContatoStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContatoStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
