import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
    return this.http.put<Client>(url, client);
  }

  deleteClient(idClient: number): Observable<Client> {
    return this.http.delete<Client>(`${this.baseurl}/${idClient}`);
  }
}
