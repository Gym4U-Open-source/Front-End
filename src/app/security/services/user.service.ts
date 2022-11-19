import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../shared/services/base.service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
    this.BASE_URL += '/users/';
  }

  postUser(data: FormGroup<User>): Observable<FormGroup<User>> {
    return this.http.post<FormGroup<User>>(
      `${this.BASE_URL}auth/sign-up`,
      data.value
    );
  }

  signUp(data: any): Observable<any> {
    return this.http.post<any>(this.BASE_URL + 'auth/sign-up', data);
  }

  getUsers(data: any): Observable<any> {
    return this.http.post<Array<User>>(`${this.BASE_URL}auth/sign-in`, data);
  }
}
