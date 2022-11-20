import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class FallowerService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
    this.BASE_URL;
  }

  getUserFollowers(userId: number): Observable<any> {
    // http://localhost:8080/api/v1/users/2/followers
    return this.http.get<any>(`${this.BASE_URL}/users/${userId}/followers`);
  }

  getUserFollow(userId: number): Observable<any> {
    // http://localhost:8080/api/v1/users/2/followers
    return this.http.get<any>(`${this.BASE_URL}/users/${userId}/followers/follow`);
  }
}
