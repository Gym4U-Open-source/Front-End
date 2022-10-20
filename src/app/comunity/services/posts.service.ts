import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Post } from '../models/post';
import { BaseService } from '../../shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
    this.BASE_URL += '/posts/';
  }

  getAll(): Observable<Post> {
    return this.http
      .get<Post>(this.BASE_URL)
      .pipe(retry(2), catchError(this.handleError));
  }

  addPost(data: any) {
    return this.http.post<any>(this.BASE_URL, data);
  }

  getAllComments(): Observable<Post> {
    return this.http
      .get<Post>(this.BASE_URL)
      .pipe(retry(2), catchError(this.handleError));
  }
}
