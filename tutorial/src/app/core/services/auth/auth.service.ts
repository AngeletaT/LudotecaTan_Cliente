import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../models/auth/Auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:8080/auth';

  login(username: string, password: string): Observable<LoginResponse> {
    const body = { username, password };
    console.log(body);
    const response = this.http.post<LoginResponse>(
      `${this.baseUrl}/login`,
      body
    );
    console.log(response);
    return response;
  }

  register(username: string, password: string): Observable<LoginResponse> {
    const body = { username, password };
    console.log(body);
    console.log(
      this.http.post<LoginResponse>(`${this.baseUrl}/register`, body)
    );
    return this.http.post<LoginResponse>(`${this.baseUrl}/register`, body);
  }
}
