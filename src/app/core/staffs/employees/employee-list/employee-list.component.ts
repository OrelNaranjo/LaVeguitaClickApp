import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { EmployeeService } from '../employee.service';
import { TitleService } from '../../../../shared';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, RouterLink, MatIconModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent {
  employees$ = toSignal(this.employeeService.getAllEmployees());

  constructor(
    private employeeService: EmployeeService,
    private titleService: TitleService,
  ) {
    this.titleService.setTitle('Lista de Empleados');
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(+id);
  }
}
