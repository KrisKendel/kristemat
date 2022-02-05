import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AcceptSessionComponent } from './accept-session.component';

describe('AcceptSessionComponent', () => {
  let component: AcceptSessionComponent;
  let fixture: ComponentFixture<AcceptSessionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
