import { Component, ElementRef, Signal, signal, ViewChild } from '@angular/core';
import { TitleService } from '@core/services';
import { NzFormItemComponent, NzFormLabelComponent } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CurrencyPipe } from '@core/pipes';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { Product, ReceiptDetail } from '@shared/interfaces';
import { FormsModule } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { Store } from '@ngxs/store';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-create-receipt',
  standalone: true,
  imports: [
    NzFormItemComponent,
    NzFormLabelComponent,
    NzGridModule,
    CurrencyPipe,
    NzTableComponent,
    NzSelectComponent,
    NzOptionComponent,
    FormsModule,
    NzIconDirective,
  ],
  providers: [NzMessageService],
  templateUrl: './create-receipt.component.html',
  styleUrl: './create-receipt.component.scss',
})
export class CreateReceiptComponent {
  @ViewChild('productSelect', { read: ElementRef }) productSelectElement!: ElementRef;

  products$: Signal<Product[]>;
  receiptDetails$ = signal<ReceiptDetail[]>([]);
  selectedProduct: Product | null = null;
  selectedQuantity = 1;

  constructor(
    private readonly titleService: TitleService,
    private readonly messageService: NzMessageService,
    private readonly store: Store,
  ) {
    this.titleService.setTitle('Crear Boleta');
    this.products$ = toSignal(this.store.select((state) => state.products.products));
  }

  agregarProducto(): void {
    if (this.selectedProduct && this.selectedQuantity > 0) {
      const existingProductIndex = this.receiptDetails$().findIndex((detail) => detail.product.id === this.selectedProduct?.id);
      if (existingProductIndex !== -1) {
        const existingDetail = this.receiptDetails$()[existingProductIndex];
        existingDetail.quantity += this.selectedQuantity;
        existingDetail.subtotal = existingDetail.price * existingDetail.quantity;
      } else {
        this.receiptDetails$().push({
          id: this.receiptDetails$().length + 1,
          product: this.selectedProduct,
          quantity: this.selectedQuantity,
          cost: Number(this.selectedProduct.cost),
          price: Number(this.selectedProduct.price),
          subtotal: this.selectedProduct.price * this.selectedQuantity,
        });
      }
    }
  }

  eliminarProducto(detalle: ReceiptDetail): void {
    this.receiptDetails$().splice(this.receiptDetails$().indexOf(detalle), 1);
  }

  total$() {
    return this.receiptDetails$()
      .map((detalle) => detalle.subtotal)
      .reduce((a, b) => a + b, 0);
  }

  enviarBoleta(): void {
    this.receiptDetails$.set([]);
    this.selectedProduct = null;
    this.selectedQuantity = 1;
    this.messageService.success('Boleta N° 1 emitida correctamente');
    this.focusProductSelect();
  }

  focusProductSelect(): void {
    this.productSelectElement.nativeElement.focus();
  }
}
