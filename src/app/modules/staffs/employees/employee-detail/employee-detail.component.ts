import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { TitleService } from '@core/services';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { Employee } from '@shared/interfaces';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss',
})
export class EmployeeDetailComponent {
  id: string = this.route.snapshot.paramMap.get('id')!;
  employee$ = toSignal<Employee>(this.employeeService.getEmployee(this.id));

  constructor(
    private readonly titleService: TitleService,
    private readonly employeeService: EmployeeService,
    private readonly route: ActivatedRoute,
  ) {
    this.titleService.setTitle('Detalles del empleado');
  }
}
