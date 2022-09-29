import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {NgForm} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {CustomerService} from "../../services/customer.service";
import {WorkoutsCustomer} from "../../model/workouts-customer";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

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
