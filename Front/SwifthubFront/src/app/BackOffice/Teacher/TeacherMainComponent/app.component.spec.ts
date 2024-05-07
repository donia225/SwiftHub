import { TestBed } from '@angular/core/testing';
import { AppComponentTeacher } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponentTeacher
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponentTeacher);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-pi'`, () => {
    const fixture = TestBed.createComponent(AppComponentTeacher);
    const app = fixture.componentInstance;
   // expect(app.title).toEqual('angular-pi');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponentTeacher);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('angular-pi app is running!');
  });
});
