import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExerciseInstruction, Workout } from '../models/workout.model';

@Injectable({
  providedIn: 'root',
})
export class WorkoutsService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
    this.BASE_URL += '/workouts/';
  }

  // BASE PATH
  postWorkout(data: any) {
    return this.http.post<any>(this.BASE_URL, data);
  }

  getWorkout() {
    return this.http.get<any>(this.BASE_URL);
  }

  updateWorkout(data: any, id: number) {
    return this.http.put<any>(this.BASE_URL + id, data);
  }

  deleteWorkout(id: number) {
    return this.http.delete<any>(this.BASE_URL + id);
  }

  // PATH 1
  getById(id: any): Observable<Workout> {
    return this.http.get<Workout>('http://localhost:3000/workout/' + id);
  }

  delete(id: any): Observable<Workout> {
    return this.http.delete<Workout>('http://localhost:3000/workout/' + id);
  }

  getAll(): Observable<Workout> {
    return this.http.get<Workout>('http://localhost:3000/workout/');
  }

  // Path 2
  update(data: any, id: number) {
    return this.http.put<any>(
      'http://localhost:3000/exerciseInstruction/' + id,
      data
    );
  }

  getAllExercisesInstructions(): Observable<ExerciseInstruction> {
    return this.http.get<ExerciseInstruction>('http://localhost:3000/workoutCreated/');
  }
}
