import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./features/products/products.routes').then((m) => m.PRODUCTS_ROUTES),
  },
  {
    path: 'team',
    loadChildren: () => import('./features/team/team.routes').then((m) => m.TEAM_ROUTES),
  },
  {
    path: 'announcements',
    loadChildren: () =>
      import('./features/announcements/announcements.routes').then((m) => m.ANNOUNCEMENTS_ROUTES),
  },
  { path: '**', redirectTo: 'dashboard' },
];
