import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentAddEditComponentTeacher } from './appointment-add-edit.component';

describe('AppointmentAddEditComponent', () => {
  let component: AppointmentAddEditComponentTeacher;
  let fixture: ComponentFixture<AppointmentAddEditComponentTeacher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentAddEditComponentTeacher ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentAddEditComponentTeacher);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
