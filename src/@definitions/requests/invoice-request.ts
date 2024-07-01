export interface InvoiceRequest {
  customer_id: number;
  total: number;
  details: InvoiceDetailResponse[];
}

interface InvoiceDetailResponse {
  product_id: number;
  quantity: number;
  cost: number;
  price: number;
  subtotal: number;
}
