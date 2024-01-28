import { TestBed } from '@angular/core/testing';

import { DorctorService } from './dorctor.service';

describe('DorctorService', () => {
  let service: DorctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DorctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
