/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DetinationImageComponent } from './detination-image.component';

describe('DetinationImageComponent', () => {
  let component: DetinationImageComponent;
  let fixture: ComponentFixture<DetinationImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetinationImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetinationImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
