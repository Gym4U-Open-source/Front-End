import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {WorkoutsCustomer} from "../model/workouts-customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  basePath = 'http://localhost:3000/api/v1/customer';

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

  //Get Client by Id
  getById(id:any):Observable<WorkoutsCustomer> {
    return this.http.get<WorkoutsCustomer> ( `${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Get All Clients
  getAll():Observable<WorkoutsCustomer> {
    return this.http.get<WorkoutsCustomer> (this.basePath, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Delete Client
  delete(id:any):Observable<WorkoutsCustomer> {
    return this.http.delete<WorkoutsCustomer> ( `${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  postCustomer(data: any) {
    return this.http.post<any>(this.basePath, data);
  }

  updateCustomer(data: any, id: number) {
    return this.http.put<any>(this.basePath + id, data);
  }
}
