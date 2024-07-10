import { Employee } from './employee'
import { User } from './user'

export interface Account {
  id: number;
  isActive: boolean;
  user?: User;
  employee?: Employee;
}
