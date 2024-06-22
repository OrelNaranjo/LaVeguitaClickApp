import { Component } from '@angular/core';
import { TitleService } from '../../../shared';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private titleService: TitleService) {
    this.titleService.setTitle('Bienvenido a La VeguitaClick');
  }
}
