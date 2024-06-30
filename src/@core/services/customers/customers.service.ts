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
}
