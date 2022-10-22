import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CustomersService} from "../../services/customers.service";

@Component({
  selector: 'app-add-customer-dialog',
  templateUrl: './add-customer-dialog.component.html',
  styleUrls: ['./add-customer-dialog.component.css']
})
export class AddCustomerDialogComponent implements OnInit {

  customerForm!: FormGroup;
  actionBtn: string = 'Save';

  constructor(
    private formbuilder: FormBuilder,
    private api: CustomersService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<AddCustomerDialogComponent>
  ) {}

  ngOnInit(): void {
    this.customerForm = this.formbuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
    });

    console.log(this.editData);
    if (this.editData) {
      this.actionBtn = 'Update';
      this.customerForm.controls['name'].setValue(this.editData.name);
      this.customerForm.controls['lastName'].setValue(this.editData.lastName);
      this.customerForm.controls['email'].setValue(this.editData.email);
    }

  }

  addCustomer() {
    if(!this.editData) {
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
      }
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
}
