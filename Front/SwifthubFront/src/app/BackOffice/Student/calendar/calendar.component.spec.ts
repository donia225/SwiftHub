import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponentStudent } from './calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponentStudent;
  let fixture: ComponentFixture<CalendarComponentStudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarComponentStudent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarComponentStudent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
