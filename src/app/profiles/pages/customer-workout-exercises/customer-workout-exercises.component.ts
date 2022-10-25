import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Workout,
  ExerciseInstruction,
} from 'src/app/fitness/models/workout.model';
import { WorkoutsService } from '../../../fitness/services/workouts.service';
import { ExercisesService } from '../../../fitness/services/exercises.service';
import { Exercice } from '../../../fitness/models/exercice.model';

@Component({
  selector: 'app-customer-workout-exercises',
  templateUrl: './customer-workout-exercises.component.html',
  styleUrls: ['./customer-workout-exercises.component.css'],
})
export class CustomerWorkoutExercisesComponent implements OnInit {
  workoutsClientData: Workout;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'id',
    'status',
    'name',
    'date',
    'sets',
    'timePerSet',
    'options',
  ];

  @ViewChild('workoutsClientForm', { static: false })
  workoutsClientForm!: NgForm;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  public id: string | null;
  name = '';

  constructor(
    private workoutService: WorkoutsService,
    private exerciseService: ExercisesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.workoutsClientData = {} as Workout;
    this.dataSource = new MatTableDataSource<any>();
  }

  getId() {
    return this.id;
  }

  ngOnInit(): void {
    this.updatesNames();
    this.dataSource.paginator = this.paginator;
    this.getAllWorkoutsClient(this.id);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getAllWorkoutsClient(id: string | null) {
    this.workoutService.getById(id).subscribe((response: Workout | any) => {
      /*
      response.forEach((element : Workout) => {
        console.log(element);

        this.workoutService.getAllExercisesInstructions().subscribe((resp: ExerciseInstruction | any) => {
          resp.forEach((element2 : ExerciseInstruction) => {
            element2.name = element2.exercise.name
          })
        })


      })*/
      console.log(response);
      this.dataSource.data = response.exercises;
      this.name = response.name;
    });
  }

  updatesNames() {
    this.workoutService
      .getAllExercisesInstructions()
      .subscribe((response: ExerciseInstruction | any) => {
        response.forEach((element: ExerciseInstruction) => {
          console.log(element);
          element.name = element.exercise.name;
          this.workoutService.update(element, element.id).subscribe({
            next: (res) => {
              console.log('update');
            },
            error: (err) => {
              console.log('Something went wrong');
            },
          });
        });
        console.log(response);
      });
  }

  /*
  getExerciseInstruction(id: string | null){
    this.workoutService.getAllExercisesInstructions().subscribe((response: ExerciseInstruction | any) => {
      response.forEach((element : ExerciseInstruction) => {
        if(element.exercise.name = id){

          return  }
      })
    })
  }

  getNameExercise(id: string | null){
    this.exerciseService.getProduct().subscribe((response: Exercice | any) => {
      response.forEach((element : Exercice) => {
        if(element.id = id){ return element.name }
      })
    })
  }
  */

  deleteItem(id: number) {
    this.workoutService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: Workout) => {
        return o.id !== id ? o : false;
      });
    });
  }
}
