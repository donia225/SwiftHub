import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizfrontComponent } from './quizfront.component';

describe('QuizfrontComponent', () => {
  let component: QuizfrontComponent;
  let fixture: ComponentFixture<QuizfrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizfrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizfrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
