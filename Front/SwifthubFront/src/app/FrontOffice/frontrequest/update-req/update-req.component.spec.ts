import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReqComponent } from './update-req.component';

describe('UpdateReqComponent', () => {
  let component: UpdateReqComponent;
  let fixture: ComponentFixture<UpdateReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateReqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
