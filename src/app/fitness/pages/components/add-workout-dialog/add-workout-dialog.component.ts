import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ExercisesService} from "../../../services/exercises.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {WorkoutsService} from "../../../services/workouts.service";

@Component({
  selector: 'app-add-workout-dialog',
  templateUrl: './add-workout-dialog.component.html',
  styleUrls: ['./add-workout-dialog.component.css']
})
export class AddWorkoutDialogComponent implements OnInit {
  tagList = ['Principiante', 'Intermedio', 'Avanzado'];
  workoutForm!: FormGroup;
  actionBtn: string = 'Save';

  constructor(
    private formbuilder: FormBuilder,
    private api: WorkoutsService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<AddWorkoutDialogComponent>
  ) { }

  ngOnInit(): void {
    this.workoutForm = this.formbuilder.group({
      name: ['', Validators.required],
      content: ['', Validators.required],
      tag: ['', Validators.required],
      owner: ['', Validators.required],
    });

    if(this.editData){
      this.actionBtn = 'Update';
      this.workoutForm.controls['name'].setValue(this.editData.name);
      this.workoutForm.controls['content'].setValue(this.editData.content);
      this.workoutForm.controls['tag'].setValue(this.editData.tag);
      this.workoutForm.controls['owner'].setValue(this.editData.owner);

    }

  }

  addWorkout() {
    if (!this.editData) {
      if (this.workoutForm.valid) {
        this.api.postWorkout(this.workoutForm.value).subscribe({
          next: (res) => {
            this.workoutForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            console.log('Error while adding the workout');
          },
        });
      }
    } else {
      console.log('update');
      this.updateWorkout();
    }
  }

  updateWorkout() {
    this.api
      .updateWorkout(this.workoutForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          this.workoutForm.reset();
          this.dialogRef.close('update');
        },
        error: (err) => {
          console.log('Something went wrong');
        },
      });
  }



}
