import { ReceiptDetail } from './receipt-detail';

export interface Receipt {
  id: number;
  date: Date;
  total: number;
  details: ReceiptDetail[];
}
