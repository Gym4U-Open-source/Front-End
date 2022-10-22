import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkoutsService extends BaseService{
  constructor(http: HttpClient) {
    super(http);
    this.BASE_URL += '/workouts/';
  }
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






}
