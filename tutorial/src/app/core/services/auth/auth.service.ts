import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoginResponse } from '../../models/auth/Auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:8080/auth';

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post<any>(`${this.baseUrl}/login`, body).pipe(
      map((response) => {
        return { success: true, message: response.message, data: response };
      }),
      catchError(this.handleError)
    );
  }

  register(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post<any>(`${this.baseUrl}/register`, body).pipe(
      map((response) => {
        return { success: true, message: response.message };
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error desconocido';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = error.error.message || 'Ocurrió un error desconocido';
    }
    return throwError({ success: false, message: errorMessage });
  }
}
