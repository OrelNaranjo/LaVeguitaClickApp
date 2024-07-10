import { Address } from './address';
import { Contact } from './contact';

export interface Supplier {
  id: number;
  rut: string;
  company_name: string;
  phone: string;
  email: string;
  description: string;
  is_active: boolean;
  is_deleted: boolean;
  contacts: Contact[];
  addresses: Address[];
}


export interface SuppliersStateModel {
  suppliers: Supplier[];
}
