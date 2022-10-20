import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomersService} from "../../services/customers.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Tile} from "../../pages/customer-workouts/customer-workouts.component";
import {CustomerProfile} from "../../model/customer-profile";
import {WorkoutsService} from "../../../Fitness/services/workouts.service";
import {Workout} from "../../../Fitness/models/workout";

@Component({
  selector: 'app-add-customer-workout-dialog',
  templateUrl: './add-customer-workout-dialog.component.html',
  styleUrls: ['./add-customer-workout-dialog.component.css']
})
export class AddCustomerWorkoutDialogComponent implements OnInit {

  customerForm!: FormGroup;
  actionBtn: string = 'Save';
  workouts: string[];

  constructor(
    private formbuilder: FormBuilder,
    private workoutService: WorkoutsService,
    private api: CustomersService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<AddCustomerWorkoutDialogComponent>
  ) {
    this.workouts = [];
  }

  ngOnInit(): void {
    this.getAllWorkouts(),
    this.customerForm = this.formbuilder.group({
      date: ['', Validators.required],
      workout: ['', Validators.required],
    });


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
    this.workoutService.getAll().subscribe((response: Workout) => {
      this.workouts.push(response.name);
    });
  }
}
