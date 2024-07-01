import { Product } from './../../../../../@shared/interfaces/product';
import { CommonModule } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TitleService } from '@core/services';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngxs/store';
import { DeleteProduct, LoadProducts } from '../../../../../@core';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, CommonModule, MatIconModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  products$: Signal<Product[]>;

  constructor(
    private store: Store,
    private router: Router,
    private titleService: TitleService,
  ) {
    this.titleService.setTitle('Lista de productos');
    this.store.dispatch(new LoadProducts());
    this.products$ = toSignal(this.store.select((state) => state.products.products));
  }

  editProduct(product: Product) {
    this.router.navigate(['/productions/products', product.id, 'edit']);
  }

  deleteProduct(product: Product) {
    this.store.dispatch(new DeleteProduct(product.id));
  }
}
