import { Routes } from '@angular/router';

export const ANNOUNCEMENTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./announcements.component').then((m) => m.AnnouncementsComponent),
  },
];
