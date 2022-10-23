import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostMypostsComponent } from './post-myposts.component';

describe('PostMypostsComponent', () => {
  let component: PostMypostsComponent;
  let fixture: ComponentFixture<PostMypostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostMypostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostMypostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
