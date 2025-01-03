import { toSignal } from '@angular/core/rxjs-interop';
import { Component, ElementRef, ViewChild, OnInit, Signal, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Customer, Invoice, InvoiceDetail, Product } from '@shared/interfaces';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { NzColDirective, NzGridModule } from 'ng-zorro-antd/grid';
import { CurrencyPipe } from '@core/pipes';
import { TitleService } from '@core/services';
import { Store } from '@ngxs/store';
import { LoadCustomers, LoadProducts, CreateInvoice } from '@core/stores';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CurrencyPipe, NzColDirective, NzSelectComponent, NzOptionComponent, NzTableComponent, ReactiveFormsModule, MatIconModule, NzGridModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss',
})
export class InvoiceComponent implements OnInit, AfterViewInit {
  @ViewChild('quantityInput') quantityInput!: ElementRef;
  @ViewChild('selectInput', { static: false }) selectInput!: NzSelectComponent;

  createInvoiceForm!: FormGroup;
  products$: Signal<Product[]>;
  customers$: Signal<Customer[]>;
  addedProducts: InvoiceDetail[] = [];
  total = 0;

  constructor(
    private readonly fb: FormBuilder,
    private readonly titleService: TitleService,
    private readonly store: Store,
    private readonly router: Router,
  ) {
    this.titleService.setTitle('Crear factura');
    this.store.dispatch(new LoadCustomers());
    this.store.dispatch(new LoadProducts());
    this.products$ = toSignal(this.store.select((state) => state.products.products));
    this.customers$ = toSignal(this.store.select((state) => state.customers.customers));
  }

  ngOnInit(): void {
    this.createInvoiceForm = this.fb.group({
      customer: ['', Validators.required],
      selectedProduct: [null],
      quantity: [1, [Validators.required, Validators.min(1)]],
    });
  }

  addProduct() {
    const selectedProduct = this.createInvoiceForm.get('selectedProduct')?.value;
    const quantity = this.createInvoiceForm.get('quantity')?.value;

    if (selectedProduct && quantity) {
      const existingProduct = this.addedProducts.find((detail) => detail.product.id === selectedProduct.id);
      if (existingProduct) {
        existingProduct.quantity += quantity;
        existingProduct.subtotal = existingProduct.quantity * existingProduct.price;
      } else {
        const productToAdd = {
          product: selectedProduct,
          quantity: quantity,
          cost: Number(selectedProduct.cost),
          price: Number(selectedProduct.price),
          subtotal: Number(selectedProduct.price) * quantity,
        };
        this.addedProducts.push(productToAdd);
      }
      this.createInvoiceForm.get('selectedProduct')?.reset();
      this.createInvoiceForm.get('quantity')?.setValue(1);
      this.updateTotal();
      this.focusSelectInput();
    }
  }

  removeProduct(detail: InvoiceDetail): void {
    this.addedProducts = this.addedProducts.filter((d) => d.product.id !== detail.product.id);
    this.updateTotal();
  }

  updateTotal(): void {
    this.total = this.addedProducts.reduce((acc, detail) => acc + detail.subtotal, 0);
  }

  submitInvoice(): void {
    if (this.createInvoiceForm.valid && this.addedProducts.length > 0 && this.createInvoiceForm.value.customer) {
      const newInvoice: Invoice = {
        customer: this.createInvoiceForm.value.customer,
        customer_id: this.createInvoiceForm.value.customer.id,
        total: this.total,
        details: this.addedProducts.map(({ product, quantity, cost, price, subtotal }) => ({
          product: product,
          quantity: quantity,
          cost: cost,
          price: price,
          subtotal: subtotal,
        })),
      };
      console.log(newInvoice);
      this.store.dispatch(new CreateInvoice(newInvoice));
      this.resetForm();
      this.router.navigate(['/sales/invoices']);
    }
  }

  resetForm(): void {
    this.createInvoiceForm.reset();
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
