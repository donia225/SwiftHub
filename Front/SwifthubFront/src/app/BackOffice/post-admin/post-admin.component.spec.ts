import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAdminComponent } from './post-admin.component';

describe('PostAdminComponent', () => {
  let component: PostAdminComponent;
  let fixture: ComponentFixture<PostAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
