import { TestBed } from '@angular/core/testing';

import { OnlineCourseService } from './online-course.service';

describe('OnlineCourseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OnlineCourseService = TestBed.get(OnlineCourseService);
    expect(service).toBeTruthy();
  });
});
