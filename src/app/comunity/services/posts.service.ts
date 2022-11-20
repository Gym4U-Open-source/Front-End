import {EventEmitter, Injectable, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Post } from '../models/post';
import { BaseService } from '../../shared/services/base.service';
import {CustomerProfile} from "../../profiles/model/customer-profile";
import {Profile} from "../models/profiles";

@Injectable({
  providedIn: 'root',
})
export class PostsService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
    this.BASE_URL += '/';
  }


  getAll(): Observable<Post> {
    return this.http
      .get<Post>(`${this.BASE_URL}posts/all`)
      .pipe(retry(2), catchError(this.handleError));
  }

  addPost(id:any,data: Post) {
    return this.http.post<Post>(`${this.BASE_URL}posts/create-post/${id}`, data);
  }

  getAllComments(): Observable<Post> {
    return this.http
      .get<Post>(this.BASE_URL)
      .pipe(retry(2), catchError(this.handleError));
  }
  getProfileById(id:any):Observable<any> {
    return this.http.get<any> ( `${this.BASE_URL}profiles/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
