import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared';
import { HomeComponent } from './core';
import { authRoutes } from './core/auths/auth.routes';
import { productionRoutes } from './core/productions/production.routes';
import { staffsRoutes } from './core/staffs/staff.routes';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  ...authRoutes,
  ...productionRoutes,
  ...staffsRoutes,
  { path: '**', component: PageNotFoundComponent },
];
