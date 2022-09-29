import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExercisesService {
  baseUrl: string = 'http://localhost:3000/exercises/';

  constructor(private http: HttpClient) {}

  postProduct(data: any) {
    return this.http.post<any>(this.baseUrl, data);
  }

  getProduct() {
    return this.http.get<any>(this.baseUrl);
  }

  updateProduct(data: any, id: number) {
    return this.http.put<any>(this.baseUrl + id, data);
  }

  deleteProduct(id: number) {
    return this.http.delete<any>(this.baseUrl + id);
  }
}
