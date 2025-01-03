import { Employee } from './employee';
import { OrderDetail } from './order-detail';
import { Supplier } from './supplier';

export interface Order {
  id: number;
  orderNumber?: number;
  notes?: string;
  employee: Employee;
  supplier: Supplier;
  date?: Date;
  total?: number;
  orderDetails: OrderDetail[];
}

export interface OrderStateModel {
  orders: Order[];
}
