import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';

import { SendSessionRequestComponent } from './send-session-request.component';

describe('SendSessionRequestComponent', () => {
  let component: SendSessionRequestComponent;
  let fixture: ComponentFixture<SendSessionRequestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SendSessionRequestComponent],
      providers: [MatDialog],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendSessionRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
