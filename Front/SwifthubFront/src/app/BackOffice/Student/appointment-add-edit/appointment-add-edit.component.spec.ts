import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentAddEditComponentStudent } from './appointment-add-edit.component';

describe('AppointmentAddEditComponent', () => {
  let component: AppointmentAddEditComponentStudent;
  let fixture: ComponentFixture<AppointmentAddEditComponentStudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentAddEditComponentStudent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentAddEditComponentStudent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
