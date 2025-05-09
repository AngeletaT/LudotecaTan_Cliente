import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/games',
    pathMatch: 'full',
  },
  {
    path: 'games',
    loadComponent: () =>
      import('./shared/components/games/game-list/game-list.component').then(
        (m) => m.GameListComponent
      ),
  },
  {
    path: 'categories',
    loadComponent: () =>
      import(
        './shared/components/categories/category-list/category-list.component'
      ).then((m) => m.CategoryListComponent),
  },
  {
    path: 'authors',
    loadComponent: () =>
      import(
        './shared/components/authors/author-list/author-list.component'
      ).then((m) => m.AuthorListComponent),
  },
  {
    path: 'clients',
    loadComponent: () =>
      import(
        './shared/components/clients/client-list/client-list.component'
      ).then((m) => m.ClientListComponent),
  },
  {
    path: 'loans',
    loadComponent: () =>
      import('./shared/components/loans/loan-list/loan-list.component').then(
        (m) => m.LoanListComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./shared/components/auth/auth-forms/auth-forms.component').then(
        (m) => m.AuthFormsComponent
      ),
  },
];
