import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowWorkshopComponent } from './show-workshop.component';

describe('ShowWorkshopComponent', () => {
  let component: ShowWorkshopComponent;
  let fixture: ComponentFixture<ShowWorkshopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowWorkshopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
