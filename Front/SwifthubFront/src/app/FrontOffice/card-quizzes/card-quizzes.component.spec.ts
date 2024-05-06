import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardQuizzesComponent } from './card-quizzes.component';

describe('CardQuizzesComponent', () => {
  let component: CardQuizzesComponent;
  let fixture: ComponentFixture<CardQuizzesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardQuizzesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
