import { TestBed } from '@angular/core/testing';

import { CoachProfileService } from './coach-profile.service';

describe('CoachProfileService', () => {
  let service: CoachProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoachProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
