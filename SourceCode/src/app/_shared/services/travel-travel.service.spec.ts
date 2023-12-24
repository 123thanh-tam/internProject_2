/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TravelTravelService } from './travel-travel.service';

describe('Service: TravelTravel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TravelTravelService]
    });
  });

  it('should ...', inject([TravelTravelService], (service: TravelTravelService) => {
    expect(service).toBeTruthy();
  }));
});
