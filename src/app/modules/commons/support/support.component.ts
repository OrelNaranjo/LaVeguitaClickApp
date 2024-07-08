import { Component } from '@angular/core';
import { TitleService } from '../../../../@core';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [],
  templateUrl: './support.component.html',
  styleUrl: './support.component.scss',
})
export class SupportComponent {
  constructor(private titleService: TitleService) {
    this.titleService.setTitle('Soporte Técnico');
  }
}
