import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { environment } from '../../../@config'
import { Order } from '../../../@shared'

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order> {
    return this.http.get<Order>(`${environment.API_URL}orders`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${environment.API_URL}orders`, order);
  }

  updateOrder(order: Order): Observable<Order> {
    return this.http.patch<Order>(`${environment.API_URL}orders/${order.id}`, order);
  }

  deleteOrder(id: number): Observable<Order> {
    return this.http.delete<Order>(`${environment.API_URL}orders/${id}`);
  }
}
