import {Component, OnInit, ViewChild} from '@angular/core';
import {CustomerProfile} from "../../model/customer-profile";
import {MatTableDataSource} from "@angular/material/table";
import {NgForm} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {CustomersService} from "../../services/customers.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  clientData: CustomerProfile;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'lastName', 'email','last7dTraining','last1mTraining','last7dTasks', 'options'];

  @ViewChild('studentForm', {static:false})
  studentForm! : NgForm;

  @ViewChild(MatPaginator, {static: true})
  paginator!:MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private clientService: CustomersService,
              public dialog: MatDialog) {
    this.clientData = {} as CustomerProfile;
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllClients();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  getAllClients() {
    this.clientService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }
  deleteItem(id: number){
    this.clientService.delete(id).subscribe(()=>{
      this.dataSource.data = this.dataSource.data.filter((o:CustomerProfile) => {return o.id !== id ? o : false})
    });
  }

}
