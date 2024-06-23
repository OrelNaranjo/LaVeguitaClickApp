import { Routes } from '@angular/router';
import { ReceiptComponent } from './receipt/receipt.component';
import { InvoiceComponent } from './invoice/invoice.component';


export const salesRoutes: Routes = [
  { path: 'receipt', component: ReceiptComponent },
  { path: 'invoice', component: InvoiceComponent }
];
