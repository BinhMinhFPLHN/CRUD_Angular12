import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  //book
  postDashboard(data: any) {
    return this.http.post<any>("http://localhost:3000/posts/", data)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  getDashboard() {
    return this.http.get<any>("http://localhost:3000/posts/")
      .pipe(map((res: any) => {
        return res;
      }))
  }
  updateDashboard(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/posts/" + id, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  deleteDashboard(id: number) {
    return this.http.delete<any>("http://localhost:3000/posts/" + id)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  //category
  postLishbook(data: any) {
    return this.http.post<any>("http://localhost:3000/category/", data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  
  getLishbook() {
    return this.http.get<any>("http://localhost:3000/category/")
      .pipe(map((res: any) => {
        return res;
      }))
  }
  updateLishbook(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/category/" + id, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  deleteLishbook(id: number) {
    return this.http.delete<any>("http://localhost:3000/category/" + id)
      .pipe(map((res: any) => {
        return res;
      }))
  }
}
