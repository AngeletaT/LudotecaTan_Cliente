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
];
