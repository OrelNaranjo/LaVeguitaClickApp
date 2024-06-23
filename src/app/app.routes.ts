import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared';
import { HomeComponent } from './core';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'auth', loadChildren: () => import('./core/auths/auth.routes').then(m => m.authRoutes) },
  { path: 'production', loadChildren: () => import('./core/productions').then(m => m.productionRoutes) },
  { path: 'staffs', loadChildren: () => import('./core/staffs/staff.routes').then(m => m.staffsRoutes) },
  { path: 'sales', loadChildren: () => import('./core/sales').then(m => m.salesRoutes) },
  { path: '**', component: PageNotFoundComponent },
];
