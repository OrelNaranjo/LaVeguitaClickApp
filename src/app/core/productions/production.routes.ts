import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductComponent } from './products/product/product.component';
import { Routes } from '@angular/router';

export const productionRoutes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'products/new', component: ProductComponent },
];
