import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class FallowerService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
    this.BASE_URL;
  }
}
