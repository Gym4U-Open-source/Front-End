import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerWorkoutExercisesComponent } from './customer-workout-exercises.component';

describe('CustomerWorkoutExercisesComponent', () => {
  let component: CustomerWorkoutExercisesComponent;
  let fixture: ComponentFixture<CustomerWorkoutExercisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerWorkoutExercisesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerWorkoutExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
