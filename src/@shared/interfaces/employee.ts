import { Account } from './account';
import { Address } from './address';
import { EmployeeDetail } from './employee-detail';

export interface Employee {
  id: number;
  run: string;
  phone: string;
  birth_date: Date;
  is_active: boolean;
  manager: Employee;
  account: Account;
  employeeDetails: EmployeeDetail[];
  addresses: Address[];
  is_deleted: boolean;
}
