import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employees/employee-detail/employee-detail.component';

export const staffsRoutes: Routes = [
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employee/:id/view', component: EmployeeDetailComponent },
];
