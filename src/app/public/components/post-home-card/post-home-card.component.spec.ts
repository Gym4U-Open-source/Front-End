import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostHomeCardComponent } from './post-home-card.component';

describe('PostHomeCardComponent', () => {
  let component: PostHomeCardComponent;
  let fixture: ComponentFixture<PostHomeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostHomeCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostHomeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
