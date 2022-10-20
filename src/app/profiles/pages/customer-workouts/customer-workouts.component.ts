import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {NgForm} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {CustomerProfile} from "../../model/customer-profile";
import {CustomersService} from "../../services/customers.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-customer-workouts',
  templateUrl: './customer-workouts.component.html',
  styleUrls: ['./customer-workouts.component.css']
})
export class CustomerWorkoutsComponent implements OnInit {

  workoutsClientData: CustomerProfile;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'status', 'name', 'date','progress', 'options'];


  @ViewChild('workoutsClientForm', {static:false})
  workoutsClientForm! : NgForm;

  @ViewChild(MatPaginator, {static: true})
  paginator!:MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  public id: string | null;
  name = ''

  constructor(private workoutCustomerService: CustomersService,
              public dialog: MatDialog,
              private router: Router, private route: ActivatedRoute) {

    this.id = this.route.snapshot.paramMap.get('id');
    this.workoutsClientData = {} as CustomerProfile;
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllWorkoutsClient(this.id)
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  getAllWorkoutsClient(id: string | null) {
    this.workoutCustomerService.getById(id).subscribe((response: CustomerProfile) => {
      //console.log(response.workouts)
      this.dataSource.data = response.workouts;
      this.name = response.name;
    });
  }
  deleteItem(id: number){
    this.workoutCustomerService.delete(id).subscribe(()=>{
      this.dataSource.data = this.dataSource.data.filter((o:CustomerProfile) => {return o.id !== id ? o : false})
    });
  }

}
