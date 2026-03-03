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
}

