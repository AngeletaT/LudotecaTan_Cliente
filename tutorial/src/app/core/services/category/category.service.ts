import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../../models/Category';
import { CATEGORY_DATA } from '../../models/mock-categories';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  private baseurl = 'http://localhost:8080/category';

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseurl);
  }

  saveCategory(category: Category): Observable<Category> {
    const { id } = category;
    const url = id ? `${this.baseurl}/${id}` : this.baseurl;
    return this.http.put<Category>(url, category);
  }

  deleteCategory(idCategory: number): Observable<Category> {
    return this.http.delete<Category>(`${this.baseurl}/${idCategory}`);
  }
}
