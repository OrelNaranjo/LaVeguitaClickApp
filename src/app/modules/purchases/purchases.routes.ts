import { Routes } from '@angular/router';
import { OrderListComponent, OrderComponent, OrderDetailComponent } from './orders';
import { PurchasesComponent } from './purchases/purchases.component';
import { SupplierListComponent, SupplierComponent, SupplierDetailComponent } from './suppliers';

export const purchasesRoutes: Routes = [
  { path: '', component: PurchasesComponent },
  { path: 'orders', component: OrderListComponent },
  { path: 'orders/new', component: OrderComponent },
  { path: 'orders/:id', component: OrderDetailComponent },
  { path: 'orders/:id/edit', component: OrderComponent },
  { path: 'suppliers', component: SupplierListComponent },
  { path: 'suppliers/new', component: SupplierComponent },
  { path: 'suppliers/:id', component: SupplierDetailComponent },
  { path: 'suppliers/:id/edit', component: SupplierComponent },
];
