import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddExerciseDialogComponent } from '../components/add-exercise-dialog/add-exercise-dialog.component';
import { ExercisesService } from '../../services/exercises.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WorkoutsService } from '../../services/workouts.service';
import {AddWorkoutDialogComponent} from "../components/add-workout-dialog/add-workout-dialog.component";

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css'],
})
export class WorkoutsComponent implements OnInit {
  title = '05_crud_api_material_ui';
  totalData!: number;
  dataSource!: MatTableDataSource<any>;

  displayedColumns: string[] = [
    'Title',
    'Content',
    'Tag',
    'Exercises',
    'Open Recent',
    'Owner',
    'Actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: WorkoutsService) {}

  ngOnInit(): void {
    this.getAllWorkouts();
  }

  openDialog() {
    this.dialog
      .open(AddWorkoutDialogComponent, {
        width: '432px',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllWorkouts();
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getAllWorkouts() {
    this.api.getWorkout().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res.content);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.totalData = res.length;
      },
      error: (err) => {
        console.log('Error while fetching the Records!!');
      },
    });
  }

  editWorkout(row: any) {
    this.dialog
      .open(AddWorkoutDialogComponent, {
        width: '432px',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getAllWorkouts();
        }
      });
  }

  deleteWorkout(id: number) {
    this.api.deleteWorkout(id).subscribe({
      next: (res) => {
        console.log('Workout deleted successfully.');
        this.getAllWorkouts();
      },
      error: (err) => {
        console.log('Something went while deleting');
      },
    });
  }

}
