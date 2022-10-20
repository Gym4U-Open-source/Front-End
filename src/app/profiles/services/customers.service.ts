import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { CustomerProfile } from '../model/customer-profile';
import { BaseService } from 'src/app/shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class CustomersService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
    this.BASE_URL += '/customers/';
  }

  getById(id: any): Observable<CustomerProfile> {
    return this.http
      .get<CustomerProfile>(`${this.BASE_URL}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getAll(): Observable<CustomerProfile> {
    return this.http
      .get<CustomerProfile>(this.BASE_URL, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  delete(id: any): Observable<CustomerProfile> {
    return this.http
      .delete<CustomerProfile>(`${this.BASE_URL}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  postCustomer(data: any) {
    return this.http.post<any>(this.BASE_URL, data);
  }

  updateCustomer(data: any, id: number) {
    return this.http.put<any>(this.BASE_URL + id, data);
  }
}
