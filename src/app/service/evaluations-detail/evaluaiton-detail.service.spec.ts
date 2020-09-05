import { TestBed } from '@angular/core/testing';

import { EvaluationsDetailService } from './evaluations-detail.service';

describe('EvaluationsDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EvaluationsDetailService = TestBed.get(EvaluationsDetailService);
    expect(service).toBeTruthy();
  });
});
