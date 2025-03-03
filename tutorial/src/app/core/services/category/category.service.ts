import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../../models/Category';
import { CATEGORY_DATA } from '../../models/mock-categories';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor() {}

  getCategories(): Observable<Category[]> {
    return of(CATEGORY_DATA);
  }

  saveCategory(category: Category): Observable<Category> {
    return of(null);
  }

  deleteCategory(categoryId: number): Observable<Category> {
    return of(null);
  }
}
