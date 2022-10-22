import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerWorkoutDialogComponent } from './add-customer-workout-dialog.component';

describe('AddCustomerWorkoutDialogComponent', () => {
  let component: AddCustomerWorkoutDialogComponent;
  let fixture: ComponentFixture<AddCustomerWorkoutDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCustomerWorkoutDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCustomerWorkoutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
