/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DestinationService } from './destination.service';

describe('Service: Destination', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DestinationService]
    });
  });

  it('should ...', inject([DestinationService], (service: DestinationService) => {
    expect(service).toBeTruthy();
  }));
});
