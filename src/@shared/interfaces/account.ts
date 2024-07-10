import { Employee } from './employee'
import { Role } from './role'

export interface Account {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  employee: Employee;
  roles: Role[]
}
