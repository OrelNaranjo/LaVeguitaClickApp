import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './layout';
import { HomeComponent, ManualComponent, SupportComponent } from './modules';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'help', component: SupportComponent },
  { path: 'doc', component: ManualComponent },
  { path: 'auth', loadChildren: () => import('./modules/auths/auth.routes').then((m) => m.authRoutes) },
  { path: 'productions', loadChildren: () => import('./modules/productions').then((m) => m.productionsRoutes) },
  { path: 'staffs', loadChildren: () => import('./modules/staffs/staff.routes').then((m) => m.staffsRoutes) },
  { path: 'sales', loadChildren: () => import('./modules/sales/sales.routes').then((m) => m.salesRoutes) },
  { path: 'purchases', loadChildren: () => import('./modules/purchases/purchases.routes').then((m) => m.purchasesRoutes) },
  { path: '**', component: PageNotFoundComponent },
];
