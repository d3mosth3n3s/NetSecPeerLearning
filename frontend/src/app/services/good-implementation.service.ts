import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoodImplementationService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  public saveXSSValue(goodInput: string) {
    return this.http.post(`${this.apiUrl}/xss/good`, { value: goodInput }).subscribe({
      next: (response) => {
        console.log('XSS value saved successfully:', response);
      },
      error: (error) => {
        console.error('Error saving XSS value:', error);
      }
    });
  }

  public getXSSValue(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/xss/good/${id}`);
  }
}
 