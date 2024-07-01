import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './layout';
import { HomeComponent } from './modules';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'auth', loadChildren: () => import('./modules/auths/auth.routes').then((m) => m.authRoutes) },
  { path: 'production', loadChildren: () => import('./modules/productions').then((m) => m.productionRoutes) },
  { path: 'staffs', loadChildren: () => import('./modules/staffs/staff.routes').then((m) => m.staffsRoutes) },
  { path: 'sales', loadChildren: () => import('./modules/sales/sales.routes').then((m) => m.salesRoutes) },
  { path: '**', component: PageNotFoundComponent },
];
