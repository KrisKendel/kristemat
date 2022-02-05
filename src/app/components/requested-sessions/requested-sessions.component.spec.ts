import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UserService } from 'src/app/services/users.service';

import { RequestedSessionsComponent } from './requested-sessions.component';

describe('RequestedSessionsComponent', () => {
  let component: RequestedSessionsComponent;
  let fixture: ComponentFixture<RequestedSessionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RequestedSessionsComponent],
      providers: [UserService, HttpClient],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestedSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
