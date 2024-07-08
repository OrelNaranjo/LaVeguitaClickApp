import { Component } from '@angular/core';
import { TitleService } from '../../../../@core';
import { RouterLink } from '@angular/router';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid'
import { NzCardComponent, NzCardMetaComponent } from 'ng-zorro-antd/card'
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [
    RouterLink,
    NzColDirective,
    NzRowDirective,
    NzCardComponent,
    NzCardMetaComponent,
    NzIconDirective,
  ],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss',
})
export class SalesComponent {
  constructor(private titleService: TitleService) {
    this.titleService.setTitle('Módulo de Ventas');
  }
}
