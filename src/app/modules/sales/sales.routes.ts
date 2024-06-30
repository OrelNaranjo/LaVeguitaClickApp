import { Routes } from '@angular/router';
import { InvoiceComponent } from './invoices';
import { InvoiceListComponent, CreateInvoiceComponent } from './invoices';
import { CreateReceiptComponent, ReceiptComponent } from './receipts';
import { CustomerListComponent } from './customers';

export const salesRoutes: Routes = [
  { path: 'receipt', component: ReceiptComponent },
  { path: 'receipt/create', component: CreateReceiptComponent },
  { path: 'invoice', component: InvoiceComponent },
  { path: 'invoice/create', component: CreateInvoiceComponent },
  { path: 'list', component: InvoiceListComponent },
  { path: 'clients', component: CustomerListComponent },
];
