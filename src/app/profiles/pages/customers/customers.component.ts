import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CustomerProfile} from "../../model/customer-profile";
import {MatTableDataSource} from "@angular/material/table";
import {NgForm} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {CustomerProfileService} from "../../services/customer-profile.service";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit, AfterViewInit {

  customerData: CustomerProfile;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'lastName', 'address']

  @ViewChild('customerForm', {static: false})
  customerForm! : NgForm;

  @ViewChild(MatPaginator, {static:true})
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private customerService: CustomerProfileService) {
    this.customerData = {} as CustomerProfile;
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllCustomers
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getAllCustomers() {
    this.customerService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }

  deleteItem(id: number) {
    this.customerService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: CustomerProfile) => {return o.id !== id ? o : false});
    });
  }

}
