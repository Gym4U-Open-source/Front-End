import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import {Observable} from "rxjs";
import {Post} from "../../comunity/models/post";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class ExercisesService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
    this.BASE_URL += '/exercises';
  }

  postProduct(data: any) {
    return this.http.post<any>(this.BASE_URL, data);
  }

  getProduct() {
    return this.http.get<any>(this.BASE_URL);
  }

  updateProduct(data: any, id: number) {
    return this.http.put<any>(`${this.BASE_URL}/${id}`, data);
  }

  deleteProduct(id: number) {
    return this.http.delete<any>(`${this.BASE_URL}/${id}`);
  }
}
