import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomersService} from "../../services/customers.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CustomerProfile} from "../../model/customer-profile";
import {WorkoutsService} from "../../../Fitness/services/workouts.service";
import {Workout} from "../../../Fitness/models/workout";
import {ActivatedRoute} from "@angular/router";
import {
  CustomerWorkoutExercisesComponent
} from "../../pages/customer-workout-exercises/customer-workout-exercises.component";

@Component({
  selector: 'app-add-customer-workout-dialog',
  templateUrl: './add-customer-workout-dialog.component.html',
  styleUrls: ['./add-customer-workout-dialog.component.css']
})
export class AddCustomerWorkoutDialogComponent implements OnInit{

  customerForm!: FormGroup;
  actionBtn: string = 'Save';
  workouts: Workout[];

  constructor(
    private formbuilder: FormBuilder,
    private api: CustomersService,
    private workoutService: WorkoutsService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<AddCustomerWorkoutDialogComponent>
  ) {
    this.workouts = [];
  }

  ngOnInit(): void {
    this.getAllWorkouts(),
    this.customerForm = this.formbuilder.group({
      date: ['date', Validators.required],
      workout: ['workout', Validators.required],
    });
  }


  addWorkout() {
    console.log(this.editData);
    if(this.customerForm.valid) {
      console.log('pipipipi');
      console.log(this.editData);
      console.log(this.customerForm.value)

      this.api.getById(this.editData).subscribe((response: CustomerProfile) => {
        console.log('pipipipi');
        response.workouts.push(this.customerForm.value)
        this.api.updateCustomer(response, this.editData).subscribe({
          next: (res) => {
            this.customerForm.reset();
            this.dialogRef.close('update');
          },
          error: (err) => {
            console.log('Something went wrong');
          },
        });
      })
    }
    else {
      console.log('pipipipi');
}
  }

  addCustomer() {
    if (this.customerForm.valid) {

      this.api.postCustomer(this.customerForm.value).subscribe({
        next: (res) => {
          this.customerForm.reset();
          this.dialogRef.close('save');
        },
        error: () => {
          console.log('Error while adding the exercise');
        },
      });
    } else {
      console.log('update');
      this.updateCustomer();
    }
  }

  updateCustomer() {


    this.api
      .updateCustomer(this.customerForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          this.customerForm.reset();
          this.dialogRef.close('update');
        },
        error: (err) => {
          console.log('Something went wrong');
        },
      });
  }

  getAllWorkouts() {
    this.workoutService.getAll().subscribe((response: Workout | any) => {
      response.forEach((element: Workout) => {
        this.workouts.push(element);
      })
    });
  }
}
