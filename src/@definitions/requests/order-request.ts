import { Employee, Product, Supplier } from '../../@shared'

export interface OrderRequest {
  notes: string;
  employee: Employee;
  supplier: Supplier;
  sendEmail: boolean;
  orderDetails: OrderDetailRequest[];
}

interface OrderDetailRequest {
  product: Product;
  quantity: number;
}
