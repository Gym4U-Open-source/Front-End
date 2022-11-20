import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService extends BaseService {
  userData!: any;

  constructor(http: HttpClient) {
    super(http);

    this.BASE_URL += "messages/"
  }
}
