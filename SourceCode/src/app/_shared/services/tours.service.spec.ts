/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ToursService } from './tours.service';

describe('Service: Tours', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToursService]
    });
  });

  it('should ...', inject([ToursService], (service: ToursService) => {
    expect(service).toBeTruthy();
  }));
});
