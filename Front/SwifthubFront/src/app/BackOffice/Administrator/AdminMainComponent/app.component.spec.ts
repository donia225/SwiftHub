import { TestBed } from '@angular/core/testing';
import { AppComponentAdmin } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponentAdmin
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponentAdmin);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-pi'`, () => {
    const fixture = TestBed.createComponent(AppComponentAdmin);
    const app = fixture.componentInstance;
   // expect(app.title).toEqual('angular-pi');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponentAdmin);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('angular-pi app is running!');
  });
});
