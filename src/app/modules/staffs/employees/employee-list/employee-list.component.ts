import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { EmployeeService } from '../employee.service';
import { TitleService } from '@core/services';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent {
  employees$ = toSignal(this.employeeService.getAllEmployees());

  constructor(
    private readonly employeeService: EmployeeService,
    private readonly titleService: TitleService,
  ) {
    this.titleService.setTitle('Lista de Empleados');
    this.employees$()?.forEach((employee) => console.log(employee));
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(+id);
  }
}
