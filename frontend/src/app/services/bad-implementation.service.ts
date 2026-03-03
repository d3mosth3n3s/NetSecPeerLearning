import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BadImplementationService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  public badFileUploadCheck(fileInput: File): Observable<any> {
    const formData = new FormData()
    formData.append('file', fileInput)
    return this.http.post(`${this.apiUrl}/ufu/bad`, formData);
  }

  public badGetFile(id: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/ufu/bad/${id}`, { responseType: 'blob' });
  }

  public saveBadXSSValue(badInput: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/xss/bad`, { value: badInput });
  }

  public getBadXSSValue(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/xss/bad/${id}`);
  }

  public getBadSQLValue(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/sql/bad`, { username, password });
  }
}
