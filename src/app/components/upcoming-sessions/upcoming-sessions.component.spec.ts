import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UpcomingSessionsComponent } from './upcoming-sessions.component';

describe('RequestedSessionsComponent', () => {
  let component: UpcomingSessionsComponent;
  let fixture: ComponentFixture<UpcomingSessionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UpcomingSessionsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
