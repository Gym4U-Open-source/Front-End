import {Component, OnInit, ViewChild} from '@angular/core';
import {WorkoutsCustomer} from "../../model/workouts-customer";
import {MatTableDataSource} from "@angular/material/table";
import {NgForm} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {CustomerService} from "../../services/customer.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-customer-workouts',
  templateUrl: './customer-workouts.component.html',
  styleUrls: ['./customer-workouts.component.css']
})
export class CustomerWorkoutsComponent implements OnInit {

  workoutsClientData: WorkoutsCustomer;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'status', 'workout', 'date','progress', 'options'];

  @ViewChild('workoutsClientForm', {static:false})
  workoutsClientForm! : NgForm;

  @ViewChild(MatPaginator, {static: true})
  paginator!:MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private workoutCustomerService: CustomerService,
              public dialog: MatDialog) {
    this.workoutsClientData = {} as WorkoutsCustomer;
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllWorkoutsClient();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  getAllWorkoutsClient() {
    this.workoutCustomerService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }
  deleteItem(id: number){
    this.workoutCustomerService.delete(id).subscribe(()=>{
      this.dataSource.data = this.dataSource.data.filter((o:WorkoutsCustomer) => {return o.id !== id ? o : false})
    });
  }

}
