import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Workout} from "../models/workout";
import {CustomerProfile} from "../../profiles/model/customer-profile";

@Injectable({
  providedIn: 'root'
})
export class WorkoutsService {

  basePath = 'http://localhost:3000/workout';

  httpOptions = {
    headers: new HttpHeaders( {
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  // API Error Handling
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof  ErrorEvent) {
      //Default Error Handling
      console.log(`An error occurred: ${error.error.message}`);
    } else{
      // Unsuccessful Response Error Code returned from Backend
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    // Return observable with Error Message to Client
    return throwError( () =>
      new Error('Something happened with request, please try again later'));
  }

  //Get Workout by Id
  getById(id:any):Observable<Workout> {
    return this.http.get<Workout> ( `${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  delete(id:any):Observable<Workout> {
    return this.http.delete<Workout> ( `${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

}
