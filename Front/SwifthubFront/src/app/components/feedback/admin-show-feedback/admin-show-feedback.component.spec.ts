import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowFeedbackComponent } from './admin-show-feedback.component';

describe('AdminShowFeedbackComponent', () => {
  let component: AdminShowFeedbackComponent;
  let fixture: ComponentFixture<AdminShowFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminShowFeedbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminShowFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
