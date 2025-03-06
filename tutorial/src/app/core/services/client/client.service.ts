import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Client } from '../../models/client/Client';
import { CLIENT_DATA } from '../../models/client/mock-clients';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}

  private baseurl = 'http://localhost:8080/client';

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseurl);
  }

  saveClient(client: Client): Observable<Client> {
    const { id } = client;
    const url = id ? `${this.baseurl}/${id}` : this.baseurl;
    return this.http
      .put<Client>(url, client)
      .pipe(catchError(this.handleError));
  }

  deleteClient(idClient: number): Observable<Client> {
    return this.http.delete<Client>(`${this.baseurl}/${idClient}`);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = error.error.message || 'An unknown error occurred!';
    }
    return throwError(errorMessage);
  }
}
