import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../@config';
import { Order } from '../../../@shared';
import { OrderRequest } from '../../../@definitions/requests/order-request';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order> {
    return this.http.get<Order>(`${environment.API_URL}orders`);
  }

  createOrder(order: OrderRequest): Observable<OrderRequest> {
    const params = new HttpParams().set('sendEmail', order.sendEmail);
    return this.http.post<OrderRequest>(`${environment.API_URL}orders`, order, { params });
  }

  updateOrder(order: Order): Observable<Order> {
    return this.http.patch<Order>(`${environment.API_URL}orders/${order.id}`, order);
  }

  deleteOrder(id: number): Observable<Order> {
    return this.http.delete<Order>(`${environment.API_URL}orders/${id}`);
  }
}
