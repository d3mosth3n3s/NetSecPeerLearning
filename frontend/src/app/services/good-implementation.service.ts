import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoodImplementationService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  public saveGoodXSSValue(goodInput: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/xss/good`, { value: goodInput });
  }

  public getGoodXSSValue(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/xss/good/${id}`);
  }

  public getGoodSQLValue(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/sql/good`, { username, password });
  }
}