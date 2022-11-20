import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService extends BaseService {
  userData!: any;

  constructor(http: HttpClient) {
    super(http);

    this.BASE_URL += '/messages/';
  }

  getMessages(): Observable<any> {
    return this.http.get<any>(this.BASE_URL + 'from-user');
  }

  setMessage(
    toUserId: number,
    fromUserId: number,
    message: string
  ): Observable<any> {
    return this.http.post<any>(
      `${this.BASE_URL}to-user/${toUserId}/from-user/${fromUserId}`,
      { message: message }
    );
  }
}
