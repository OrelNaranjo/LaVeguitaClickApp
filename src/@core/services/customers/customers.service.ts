import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@config/environments';
import { Observable } from 'rxjs';
import { Customer } from '@shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer> {
    return this.http.get<Customer>(`${environment.API_URL}customers`);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${environment.API_URL}customers`, customer);
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.patch<Customer>(`${environment.API_URL}customers/${customer.id}`, customer);
  }

  deleteCustomer(id: number): Observable<Customer> {
    return this.http.delete<Customer>(`${environment.API_URL}customers/${id}`);
  }
}
