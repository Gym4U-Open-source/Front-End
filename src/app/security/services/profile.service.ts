import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
    this.BASE_URL += '/profiles';
  }

  postProfile(data: any): Observable<any> {
    return this.http.post<any>(this.BASE_URL, data);
  }

  getProfile() {
    return this.http.get<any>(this.BASE_URL + '/user');
  }
}
