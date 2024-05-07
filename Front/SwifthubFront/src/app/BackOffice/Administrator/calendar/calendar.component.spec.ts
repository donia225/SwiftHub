import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponentAdmin } from './calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponentAdmin;
  let fixture: ComponentFixture<CalendarComponentAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarComponentAdmin ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarComponentAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
