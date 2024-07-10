import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@config/environments';
import { Observable } from 'rxjs';
import { Supplier } from '@shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  constructor(private http: HttpClient) {}

  getSuppliers(): Observable<Supplier> {
    return this.http.get<Supplier>(`${environment.API_URL}suppliers`);
  }

  createSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(`${environment.API_URL}suppliers`, supplier);
  }

  updateSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.patch<Supplier>(`${environment.API_URL}suppliers/${supplier.id}`, supplier);
  }

  deleteSupplier(id: number): Observable<Supplier> {
    return this.http.delete<Supplier>(`${environment.API_URL}suppliers/${id}`);
  }
}
