import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontAddComponent } from './front-add.component';

describe('FrontAddComponent', () => {
  let component: FrontAddComponent;
  let fixture: ComponentFixture<FrontAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
