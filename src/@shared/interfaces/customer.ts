import { Address } from './address';

export interface Customer {
  id: number;
  rut: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  description: string;
  is_active: boolean;
  addresses: Address[];
}

export interface CustomersStateModel {
  customers: Customer[];
}
