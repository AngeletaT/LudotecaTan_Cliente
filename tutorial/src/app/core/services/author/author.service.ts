import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pageable } from '../../models/page/Pageable';
import { Author } from '../../models/author/Author';
import { AuthorPage } from '../../models/author/AuthorPage';
import { AUTHOR_DATA } from '../../models/author/mock-authors';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  constructor() {}

  getAuthors(pageable: Pageable): Observable<AuthorPage> {
    return of(AUTHOR_DATA);
  }

  saveAuthor(author: Author): Observable<void> {
    return of(null);
  }

  deleteAuthor(idAuthor: number): Observable<void> {
    return of(null);
  }
}
