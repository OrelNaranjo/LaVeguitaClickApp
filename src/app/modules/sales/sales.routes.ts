import { Routes } from '@angular/router';
import { InvoiceListComponent, CreateInvoiceComponent } from './invoices';
import { CreateReceiptComponent, ReceiptComponent } from './receipts';
import { CustomerListComponent, NewCustomerComponent } from './customers';

export const salesRoutes: Routes = [
  { path: 'receipt', component: ReceiptComponent },
  { path: 'receipt/create', component: CreateReceiptComponent },
  { path: 'invoices', component: InvoiceListComponent },
  { path: 'invoices/new', component: CreateInvoiceComponent },
  { path: 'clients', component: CustomerListComponent },
  { path: 'clients/new', component: NewCustomerComponent }
];
