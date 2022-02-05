import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AvailableDatesComponent } from './available-dates.component';

describe('AvailableDatesComponent', () => {
  let component: AvailableDatesComponent;
  let fixture: ComponentFixture<AvailableDatesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableDatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
