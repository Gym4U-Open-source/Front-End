import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import {Post} from "../components/model/post";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
//posts endpoint

  basePath = 'https://6334e767ea0de5318a0a56dd.mockapi.io/api/v1/posts'

  httpOptions={
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  constructor(private http:HttpClient) { }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Default error handling
      console.log(`An error occurred: ${error.error.message} `);
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    // Return Observable with Error Message to Client
    return throwError(() => new Error('Something happened with request, please try again later'));
  }

  // Get All Hotels
  getAll():Observable<Post>{
    return this.http.get<Post>(this.basePath,this.httpOptions)
      .pipe(retry(2),catchError(this.handleError))
  }

}