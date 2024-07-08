import { Component } from '@angular/core';
import { TitleService } from '../../../../@core';
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-manual',
  standalone: true,
  imports: [
    RouterLink,
    ],
  templateUrl: './manual.component.html',
  styleUrl: './manual.component.scss',
})
export class ManualComponent {
  constructor(private titleService: TitleService) {
    this.titleService.setTitle('Manual de uso');
  }
}
