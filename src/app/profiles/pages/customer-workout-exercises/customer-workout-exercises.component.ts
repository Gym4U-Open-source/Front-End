import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {NgForm} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {Workout} from "../../../Fitness/models/workout";
import {WorkoutsService} from "../../../Fitness/services/workouts.service";

@Component({
  selector: 'app-customer-workout-exercises',
  templateUrl: './customer-workout-exercises.component.html',
  styleUrls: ['./customer-workout-exercises.component.css']
})
export class CustomerWorkoutExercisesComponent implements OnInit {

  workoutsClientData: Workout;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'status', 'exercise', 'date','sets', 'timePerSet', 'options'];


  @ViewChild('workoutsClientForm', {static:false})
  workoutsClientForm! : NgForm;

  @ViewChild(MatPaginator, {static: true})
  paginator!:MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  public id: string | null;
  name = ''

  constructor(private workoutService: WorkoutsService,
              public dialog: MatDialog,
              private router: Router, private route: ActivatedRoute) {

    this.id = this.route.snapshot.paramMap.get('id');
    this.workoutsClientData = {} as Workout;
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
    this.workoutService.getById(id).subscribe((response: Workout) => {
      //console.log(response.workouts)
      this.dataSource.data = response.exercises;
      this.name = response.name;
    });
  }
  deleteItem(id: number){
    this.workoutService.delete(id).subscribe(()=>{
      this.dataSource.data = this.dataSource.data.filter((o:Workout) => {return o.id !== id ? o : false})
    });
  }

}
