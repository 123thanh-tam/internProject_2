/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TouristComponent } from './tourist.component';

describe('TouristComponent', () => {
  let component: TouristComponent;
  let fixture: ComponentFixture<TouristComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TouristComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TouristComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
