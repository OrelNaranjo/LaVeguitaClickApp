import { Commune } from './commune';
import { Employee } from './employee';
import { Supplier } from './supplier';

export interface Address {
  id: number;
  street: string;
  zip_code: string;
  latitude: number;
  longitude: number;
  commune: Commune;
  employee: Employee;
  supplier: Supplier;
}
