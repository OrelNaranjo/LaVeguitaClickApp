import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '@shared/interfaces';
import { environment } from '@config/environments';
import { InvoiceRequest } from '../../../@definitions';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(private http: HttpClient) {}

  getInvoices(): Observable<Invoice> {
    return this.http.get<Invoice>(`${environment.API_URL}invoices`);
  }

  createInvoice(invoice: InvoiceRequest): Observable<InvoiceRequest> {
    return this.http.post<InvoiceRequest>(`${environment.API_URL}invoices`, invoice);
  }
}
