import { Component } from '@angular/core';
import { TitleService } from '../../../services/title/title.service';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
})
export class PageNotFoundComponent {
  constructor(private titleService: TitleService) {
    this.titleService.setTitle('Error');
  }
}
