import { Address } from './address';
import { Stock } from './stock';

export interface Warehouse {
  id: number;
  name: string;
  description: string;
  capacity_kg: number;
  used_capacity_kg: number;
  phone: string;
  address: Address;
  stocks: Stock[];
}
