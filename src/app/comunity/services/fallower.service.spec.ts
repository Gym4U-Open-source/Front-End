/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FallowerService } from './fallower.service';

describe('Service: Fallower', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FallowerService]
    });
  });

  it('should ...', inject([FallowerService], (service: FallowerService) => {
    expect(service).toBeTruthy();
  }));
});
