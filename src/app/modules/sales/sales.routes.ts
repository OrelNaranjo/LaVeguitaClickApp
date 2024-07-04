import { Routes } from '@angular/router';
import { InvoiceListComponent, CreateInvoiceComponent } from './invoices';
import { CreateReceiptComponent, ReceiptComponent } from './receipts';
import { CustomerListComponent, NewCustomerComponent } from './customers';
import { SalesComponent } from './sales'


export const salesRoutes: Routes = [
  { path: '', component: SalesComponent },
  { path: 'receipts', component: ReceiptComponent },
  { path: 'receipts/new', component: CreateReceiptComponent },
  { path: 'invoices', component: InvoiceListComponent },
  { path: 'invoices/new', component: CreateInvoiceComponent },
  { path: 'clients', component: CustomerListComponent },
  { path: 'clients/new', component: NewCustomerComponent }
];
