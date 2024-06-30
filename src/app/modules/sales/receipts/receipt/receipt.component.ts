import { Component } from '@angular/core';
import { TitleService } from '@core/services';

@Component({
  selector: 'app-receipt',
  standalone: true,
  imports: [],
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.scss',
})
export class ReceiptComponent {
  constructor(private titleService: TitleService) {
    this.titleService.setTitle('Boletas');
  }
}
