import { ContractType } from '../enumerators/contract-type.enum';
import { Employee } from './employee';

export interface EmployeeDetail {
  id: number;
  position: string;
  department: string;
  salary: number;
  hire_date: Date;
  fire_date: Date;
  contract_type: ContractType;
  contract_number: number;
  employee: Employee;
  is_deleted: boolean;
}
