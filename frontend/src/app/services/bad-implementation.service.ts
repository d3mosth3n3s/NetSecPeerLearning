import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BadImplementationService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}
  
  public badFileUploadCheck(fileInput: File | null): Observable<any> {
    return this.http.post(`${this.apiUrl}/ufu/bad`, { value: fileInput });
  }
}

