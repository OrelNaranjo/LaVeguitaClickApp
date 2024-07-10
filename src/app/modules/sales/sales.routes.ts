import { Routes } from '@angular/router';
import { InvoiceListComponent, InvoiceComponent, InvoiceDetailComponent } from './invoices';
import { CreateReceiptComponent, ReceiptComponent } from './receipts';
import { CustomerListComponent, NewCustomerComponent } from './customers';
import { SalesComponent } from './sales';
import { CatalogComponent, CatalogListComponent } from './catalog';
import { GuideListComponent } from './guides';

export const salesRoutes: Routes = [
  { path: '', component: SalesComponent },
  { path: 'receipts', component: ReceiptComponent },
  { path: 'receipts/new', component: CreateReceiptComponent },
  { path: 'invoices', component: InvoiceListComponent },
  { path: 'invoices/new', component: InvoiceComponent },
  { path: 'invoices/:id', component: InvoiceDetailComponent },
  { path: 'clients', component: CustomerListComponent },
  { path: 'clients/new', component: NewCustomerComponent },
  { path: 'catalog', component: CatalogListComponent },
  { path: 'catalog/new', component: CatalogComponent },
  { path: 'guides', component: GuideListComponent },
];
