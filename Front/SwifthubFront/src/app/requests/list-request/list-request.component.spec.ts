import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRequestComponent } from './list-request.component';

describe('ListRequestComponent', () => {
  let component: ListRequestComponent;
  let fixture: ComponentFixture<ListRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
