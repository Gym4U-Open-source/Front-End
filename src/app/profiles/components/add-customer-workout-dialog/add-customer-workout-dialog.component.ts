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
  name: string;
  id: number;

  constructor(
    private formbuilder: FormBuilder,
    private api: CustomersService,
    private workoutService: WorkoutsService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<AddCustomerWorkoutDialogComponent>
  ) {
    this.workouts = [];
    this.name = "Cardio";
    this.id = 1;
  }

  ngOnInit(): void {
    this.getAllWorkouts();
    this.customerForm = this.formbuilder.group({
      id: [this.id],
      date: ['date', Validators.required],
      name: [this.name],
      workout: ['workout', Validators.required],
      status: ['Pending']
    });
  }

  addWorkout() {
    console.log(this.editData);
    if(this.customerForm.valid) {
      console.log(this.customerForm.value)

      this.api.getById(this.editData).subscribe((response: CustomerProfile) => {
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
      console.log('update');
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
