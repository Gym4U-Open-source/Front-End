import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../../shared/services/base.service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
    this.BASE_URL += '/signupUser/'
  }

  postUser(data: any) {
    return this.http.post<any>(this.BASE_URL, data);
  }

  getUsers() {
    return this.http.get<any>(this.BASE_URL);
  }
}
