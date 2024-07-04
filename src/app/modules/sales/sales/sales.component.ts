import { Component } from '@angular/core';
import { TitleService } from '../../../../@core'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss'
})
export class SalesComponent {

  constructor(private titleService: TitleService) {
    this.titleService.setTitle('Módulo de Ventas');
  }

}
