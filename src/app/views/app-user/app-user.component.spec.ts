import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UserService } from 'src/app/services/users.service';

import { AppUserComponent } from './app-user.component';

describe('AppUserComponent', () => {
  let component: AppUserComponent;
  let fixture: ComponentFixture<AppUserComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppUserComponent],
      providers: [UserService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
