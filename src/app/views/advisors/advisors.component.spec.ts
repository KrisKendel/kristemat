import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdvisorsComponent } from './advisors.component';

describe('AdvisorsComponent', () => {
  let component: AdvisorsComponent;
  let fixture: ComponentFixture<AdvisorsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AdvisorsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
