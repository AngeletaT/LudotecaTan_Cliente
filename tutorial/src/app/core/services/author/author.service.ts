import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pageable } from '../../models/page/Pageable';
import { Author } from '../../models/author/Author';
import { AuthorPage } from '../../models/author/AuthorPage';
import { AUTHOR_DATA } from '../../models/author/mock-authors';
import { AUTHOR_DATA_LIST } from '../../models/author/mock-authors-list';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:8080/author';

  getAuthors(pageable: Pageable): Observable<AuthorPage> {
    return this.http.post<AuthorPage>(this.baseUrl, { pageable: pageable });
  }

  getAllAuthors(): Observable<Author[]> {
    return of(AUTHOR_DATA_LIST);
  }

  saveAuthor(author: Author): Observable<Author> {
    const { id } = author;
    const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
    return this.http.put<Author>(url, author);
  }

  deleteAuthor(idAuthor: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idAuthor}`);
  }
}
