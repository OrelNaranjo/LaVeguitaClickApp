import { Address } from './address';
import { EmployeeDetail } from './employee-detail';

export interface Employee {
  id: number;
  run: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birth_date: Date;
  is_active: boolean;
  manager: Employee;
  employeeDetails: EmployeeDetail[];
  addresses: Address[];
  is_deleted: boolean;
}
