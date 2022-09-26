import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExercisesService } from 'src/app/services/exercises.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-exercise-dialog',
  templateUrl: './add-exercise-dialog.component.html',
  styleUrls: ['./add-exercise-dialog.component.css'],
})
export class AddExerciseDialogComponent implements OnInit {
  tagList = ['Principiante', 'Intermedio', 'Avanzado'];
  exerciseForm!: FormGroup;
  actionBtn: string = 'Save';

  constructor(
    private formbuilder: FormBuilder,
    private api: ExercisesService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<AddExerciseDialogComponent>
  ) {}

  ngOnInit(): void {
    this.exerciseForm = this.formbuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      tag: ['', Validators.required],
      focus: ['', Validators.required],
      assetUrl: ['', Validators.required],
      custom: ['true', Validators.required],
    });

    console.log(this.editData);
    if (this.editData) {
      this.actionBtn = 'Update';
      this.exerciseForm.controls['name'].setValue(this.editData.name);
      this.exerciseForm.controls['category'].setValue(this.editData.category);
      this.exerciseForm.controls['tag'].setValue(this.editData.tag);
      this.exerciseForm.controls['focus'].setValue(this.editData.focus);
      this.exerciseForm.controls['assetUrl'].setValue(this.editData.assetUrl);
      this.exerciseForm.controls['custom'].setValue(this.editData.custom);
    }
  }

  addProduct() {
    if (!this.editData) {
      if (this.exerciseForm.valid) {
        this.api.postProduct(this.exerciseForm.value).subscribe({
          next: (res) => {
            this.exerciseForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            console.log('Error while adding the exercise');
          },
        });
      }
    } else {
      console.log('update');
      this.updateProduct();
    }
  }

  updateProduct() {
    this.api
      .updateProduct(this.exerciseForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          this.exerciseForm.reset();
          this.dialogRef.close('update');
        },
        error: (err) => {
          console.log('Something went wrong');
        },
      });
  }
}
