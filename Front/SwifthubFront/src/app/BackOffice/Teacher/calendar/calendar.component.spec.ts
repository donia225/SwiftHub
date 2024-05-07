import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponentTeacher } from './calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponentTeacher;
  let fixture: ComponentFixture<CalendarComponentTeacher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarComponentTeacher ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarComponentTeacher);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
