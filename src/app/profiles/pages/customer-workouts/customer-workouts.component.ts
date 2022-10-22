import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {NgForm} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {CustomerProfile} from "../../model/customer-profile";
import {CustomersService} from "../../services/customers.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AddCustomerDialogComponent} from "../../components/add-customer-dialog/add-customer-dialog.component";
import {
  AddCustomerWorkoutDialogComponent
} from "../../components/add-customer-workout-dialog/add-customer-workout-dialog.component";
import {CustomerWorkoutExercisesComponent} from "../customer-workout-exercises/customer-workout-exercises.component";
import {WorkoutsService} from "../../../Fitness/services/workouts.service";

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  border: string;
}

@Component({
  selector: 'app-customer-workouts',
  templateUrl: './customer-workouts.component.html',
  styleUrls: ['./customer-workouts.component.css']
})

export class CustomerWorkoutsComponent implements OnInit {

  workoutsClientData: CustomerProfile;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'status', 'name', 'date', 'progress', 'options'];

  tiles: Tile[] = [
    {text: 'Last 7 Days', cols: 1, rows: 1, color: 'white', border: '1px solid'},
    {text: 'Last 30 days', cols: 1, rows: 1, color: 'white', border: '1px solid'},
    {text: 'Next Week', cols: 1, rows: 1, color: 'white', border: '1px solid'},
    {text: '100%', cols: 1, rows: 1, color: 'white', border: '1px solid'},
    {text: '100%', cols: 1, rows: 1, color: 'white', border: '1px solid'},
    {text: '100%', cols: 1, rows: 1, color: 'white', border: '1px solid'},
  ];

  @ViewChild('workoutsClientForm', {static: false})
  workoutsClientForm!: NgForm;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  public id: string | null;
  name = ''

  constructor(private workoutCustomerService: CustomersService,
              private workoutService: WorkoutsService,
              public dialog: MatDialog,
              private router: Router, private route: ActivatedRoute) {
    this.id = "";
    this.workoutsClientData = {} as CustomerProfile;
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
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
      this.name = response.name + ' ' + response.lastName;
    });
  }

  openDialog() {
    this.dialog
      .open(AddCustomerWorkoutDialogComponent, {
        data: this.id,
        width: '432px',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllWorkoutsClient(this.id);
        }
      });
  }
}


