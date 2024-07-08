import { CategoryListComponent } from './categories';
import { InventoryListComponent } from './inventories';
import { Routes } from '@angular/router';
import { ProductComponent, ProductListComponent } from './products';
import { ProcessListComponent } from './processes';
import { TransformationListComponent } from './transformations';
import { WarehouseListComponent } from './warehouses'
import { ProductionsComponent } from './productions/productions.component'

export const productionsRoutes: Routes = [
  { path: '', component: ProductionsComponent},
  { path: 'products', component: ProductListComponent },
  { path: 'products/new', component: ProductComponent },
  { path: 'categories', component: CategoryListComponent },
  { path: 'inventories', component: InventoryListComponent },
  { path: 'processes', component: ProcessListComponent },
  { path: 'transformations', component: TransformationListComponent },
  { path: 'warehouses', component: WarehouseListComponent },
];
