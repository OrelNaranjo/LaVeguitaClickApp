import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../product.service';
import { TitleService } from '../../../../shared';
import { MatIconModule } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, CommonModule, AsyncPipe, MatIconModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  products$ = toSignal(this.productService.getAllProducts());

  constructor(
    private productService: ProductService,
    private titleService: TitleService,
  ) {
    this.titleService.setTitle('Lista de productos');
  }

  deleteProduct(id: number) {}
}
