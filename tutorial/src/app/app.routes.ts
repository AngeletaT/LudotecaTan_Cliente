import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'categories',
    loadComponent: () =>
      import(
        './shared/components/categories/category-list/category-list.component'
      ).then((m) => m.CategoryListComponent),
  },
];
