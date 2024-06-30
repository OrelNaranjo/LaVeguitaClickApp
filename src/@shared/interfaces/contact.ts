import { Supplier } from './supplier';

export interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  email: string;
  phone: string;
  supplier: Supplier;
}
