import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { WorkoutsCustomer } from '../model/workouts-customer';
import { BaseService } from 'src/app/shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
    this.BASE_URL += '/customer/';
  }

  getById(id: any): Observable<WorkoutsCustomer> {
    return this.http
      .get<WorkoutsCustomer>(`${this.BASE_URL}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getAll(): Observable<WorkoutsCustomer> {
    return this.http
      .get<WorkoutsCustomer>(this.BASE_URL, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  delete(id: any): Observable<WorkoutsCustomer> {
    return this.http
      .delete<WorkoutsCustomer>(`${this.BASE_URL}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  postCustomer(data: any) {
    return this.http.post<any>(this.BASE_URL, data);
  }

  updateCustomer(data: any, id: number) {
    return this.http.put<any>(this.BASE_URL + id, data);
  }
}
