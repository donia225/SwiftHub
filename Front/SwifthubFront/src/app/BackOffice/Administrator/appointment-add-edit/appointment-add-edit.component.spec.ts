import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentAddEditComponentAdmin } from './appointment-add-edit.component';

describe('AppointmentAddEditComponent', () => {
  let component: AppointmentAddEditComponentAdmin;
  let fixture: ComponentFixture<AppointmentAddEditComponentAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentAddEditComponentAdmin ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentAddEditComponentAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
