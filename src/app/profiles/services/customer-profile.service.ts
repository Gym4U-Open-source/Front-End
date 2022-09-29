import {Injectable, ViewChild} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {CustomerProfile} from "../model/customer-profile";

@Injectable({
  providedIn: 'root'
})
export class CustomerProfileService {

  basePath = 'http://localhost:3000/api/v1/customers';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      }
    )
  };

  constructor(private http: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Default Error Handling
      console.log(`An error occurred: ${error.error}`);
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    // Return observable with Error Message to Client
    return throwError(() =>
      new Error('Something happened with request, please try again later'));
  }

  // Create Customer
  create(item: any): Observable<CustomerProfile> {
    return this.http.post<CustomerProfile>(
      this.basePath,
      JSON.stringify(item),
      this.httpOptions)
      .pipe(retry(2),
        catchError(this.handleError));
  }

  // Get All Customers
  getAll(): Observable<CustomerProfile> {
    return this.http.get<CustomerProfile>(this.basePath, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Update Customer
  update(id: any, item: any): Observable<CustomerProfile> {
    return this.http.put<CustomerProfile>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Delete Customer
  delete(id: any): Observable<CustomerProfile> {
    return this.http.delete<CustomerProfile>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
