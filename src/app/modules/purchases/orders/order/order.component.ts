import { AfterViewInit, Component, ElementRef, OnInit, Signal, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { TitleService, LoadProducts, CreateOrder, LoadOrders, LoadSuppliers, CurrencyPipe, AuthService } from '../../../../../@core';
import { Product, Supplier, OrderDetail, Employee } from '../../../../../@shared';
import { OrderRequest } from '../../../../../@definitions/requests/order-request';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { NzCheckboxComponent } from 'ng-zorro-antd/checkbox';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    NzSelectComponent,
    NzRowDirective,
    NzColDirective,
    NzOptionComponent,
    NzIconDirective,
    NzTableComponent,
    ReactiveFormsModule,
    CurrencyPipe,
    NzCheckboxComponent,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit, AfterViewInit {
  @ViewChild('quantityInput') quantityInput!: ElementRef;
  @ViewChild('selectInput', { static: false }) selectInput!: NzSelectComponent;

  createOrderForm!: FormGroup;
  products$: Signal<Product[]>;
  suppliers$: Signal<Supplier[]>;
  addedProducts: OrderDetail[] = [];
  total = 0;

  constructor(
    private readonly fb: FormBuilder,
    private readonly titleService: TitleService,
    private readonly store: Store,
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {
    this.titleService.setTitle('Nuevo pedido');
    this.store.dispatch(new LoadSuppliers());
    this.store.dispatch(new LoadProducts());
    this.products$ = toSignal(this.store.select((state) => state.products.products));
    this.suppliers$ = toSignal(this.store.select((state) => state.suppliers.suppliers));
  }

  ngOnInit(): void {
    this.createOrderForm = this.fb.group({
      supplier: ['', Validators.required],
      notes: [''],
      sendEmail: [true],
      selectedProduct: [null],
      quantity: [1, [Validators.min(1)]],
    });
  }

  addProduct() {
    const selectedProduct = this.createOrderForm.get('selectedProduct')?.value;
    const quantity = this.createOrderForm.get('quantity')?.value;

    if (selectedProduct && quantity) {
      const existingProduct = this.addedProducts.find((detail) => detail.product.id === selectedProduct.id);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        const productToAdd = {
          product: selectedProduct,
          quantity: quantity,
          cost: Number(selectedProduct.cost),
          subtotal: Number(selectedProduct.cost) * quantity,
        };
        this.total += productToAdd.subtotal;
        this.addedProducts.push(productToAdd);
      }
      this.createOrderForm.get('selectedProduct')?.reset();
      this.createOrderForm.get('quantity')?.setValue(1);
      this.focusSelectInput();
    }
  }

  submitOrder(): void {
    if (this.createOrderForm.valid && this.addedProducts.length > 0 && this.createOrderForm.value.supplier) {
      const newOrder: OrderRequest = {
        supplier: this.createOrderForm.value.supplier,
        employee: this.authService.getUser()!.employee,
        notes: this.createOrderForm.value?.notes,
        sendEmail: this.createOrderForm.value?.sendEmail,
        orderDetails: this.addedProducts.map(({ product, quantity }) => ({
          product: product,
          quantity: quantity,
        })),
      };
      this.store.dispatch(new CreateOrder(newOrder));
      this.store.dispatch(new LoadOrders(true));
      this.resetForm();
      this.router.navigate(['/purchases/orders']);
    }
  }

  removeProduct(index: number): void {
    if (this.addedProducts) {
      this.addedProducts.splice(index, 1);
      let newTotal = 0;
      this.addedProducts.forEach((product) => {
        if (product.subtotal !== undefined) {
          newTotal += product.subtotal;
        }
      });
      this.total = newTotal;
    }
  }

  resetForm(): void {
    this.createOrderForm.reset();
    this.addedProducts = [];
    this.total = 0;
  }

  focusQuantityInput(): void {
    this.quantityInput.nativeElement.focus();
    this.quantityInput.nativeElement.select();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.focusSelectInput());
  }

  focusSelectInput(): void {
    if (this.selectInput) {
      this.selectInput.focus();
    }
  }
}
