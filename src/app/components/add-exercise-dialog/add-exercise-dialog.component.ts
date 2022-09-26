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
  freshnessList = ['Brand new', 'Second hand', 'Refurbished'];
  productForm!: FormGroup;
  actionBtn: string = 'Save';

  constructor(
    private formbuilder: FormBuilder,
    private api: ExercisesService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<AddExerciseDialogComponent>
  ) {}

  ngOnInit(): void {
    this.productForm = this.formbuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    });

    console.log(this.editData);
    if (this.editData) {
      this.actionBtn = 'Update';
      this.productForm.controls['productName'].setValue(
        this.editData.productName
      );
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);
    }
  }

  addProduct() {
    if (!this.editData) {
      alert('add');
      if (this.productForm.valid) {
        this.api.postProduct(this.productForm.value).subscribe({
          next: (res) => {
            alert('Product added successfully');
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert('Error while adding the product');
          },
        });
      }
    } else {
      alert('update');
      this.updateProduct();
    }
  }

  updateProduct() {
    this.api.updateProduct(this.productForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert('Product updated');
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error: (err) => {
        alert('Something went wrong');
      },
    });
  }
}
