import {Component, OnInit, ViewChild} from '@angular/core';
import {CustomerProfile} from "../../model/customer-profile";
import {MatTableDataSource} from "@angular/material/table";
import {NgForm} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {CustomersService} from "../../services/customers.service";
import {MatDialog} from "@angular/material/dialog";
import { AddExerciseDialogComponent } from 'src/app/Fitness/pages/components/add-exercise-dialog/add-exercise-dialog.component';
import {AddCustomerDialogComponent} from "../../components/add-customer-dialog/add-customer-dialog.component";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customerData: CustomerProfile;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'lastName', 'email','last7dTraining','last1mTraining', 'options'];

  //@ViewChild('studentForm', {static:false}) studentForm! : NgForm;

  @ViewChild(MatPaginator, {static: true}) paginator!:MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private customerService: CustomersService,
              public dialog: MatDialog) {
    this.customerData = {} as CustomerProfile;
    //this.dataSource = new MatTableDataSource<any>();
  }

  openDialog() {
    this.dialog
      .open(AddCustomerDialogComponent, {
        width: '432px',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllClients();
        }
      });
  }
  ngOnInit(): void {
    //this.dataSource.paginator = this.paginator;
    this.getAllClients();
  }
  /*
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

   */
  getAllClients() {
    this.customerService.getAll().subscribe({
      next:(res) =>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log('Error while fetching the Records!!')
      },

      /*(response: any) => {
      this.dataSource.data = response;

      response.forEach((element: any) => {
        console.log(element);
      })
      */
    });
  }

  editCustomer(row: any) {
    this.dialog
      .open(AddCustomerDialogComponent, {
        width: '432px',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if( val === 'update'){
          this.getAllClients();
        }
      })
  }

  deleteItem(id: number){
    this.customerService.delete(id).subscribe(()=>{
      this.dataSource.data = this.dataSource.data.filter((o:CustomerProfile) => {return o.id !== id ? o : false})
    });
  }

}
