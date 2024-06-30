import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Customer, CreateInvoice, CreateInvoiceDetail, Product } from '@shared/interfaces';
import { NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent } from 'ng-zorro-antd/form';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { NzColDirective } from 'ng-zorro-antd/grid';
import { CurrencyPipe } from '@core/pipes';
import { TitleService } from '@core/services';

@Component({
  selector: 'app-create-invoice',
  standalone: true,
  imports: [
    CurrencyPipe,
    NzColDirective,
    NzFormControlComponent,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzSelectComponent,
    NzDatePickerComponent,
    NzOptionComponent,
    NzTableComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './create-invoice.component.html',
  styleUrl: './create-invoice.component.scss',
})
export class CreateInvoiceComponent implements OnInit {
  @ViewChild('quantityInput') quantityInput!: ElementRef;
  @ViewChild('selectInput') selectInput!: ElementRef;

  createInvoiceForm!: FormGroup;
  products: Product[] = [
    {
      id: 1,
      name: 'Producto Uno',
      description: 'Descripción del producto uno',
      is_active: true,
      sku: 'SKU-001',
      barcode: '1234567890123',
      price: 10000,
      cost: 5000,
      weight_kg: 1,
      categories: [],
      images: [],
      stocks: [],
    },
    {
      id: 2,
      name: 'Producto Dos',
      description: 'Descripción del producto dos',
      is_active: true,
      sku: 'SKU-002',
      barcode: '1234567890124',
      price: 20000,
      cost: 10000,
      weight_kg: 2,
      categories: [],
      images: [],
      stocks: [],
    },
    {
      id: 3,
      name: 'Producto Tres',
      description: 'Descripción del producto tres',
      is_active: true,
      sku: 'SKU-003',
      barcode: '1234567890125',
      price: 30000,
      cost: 15000,
      weight_kg: 3,
      categories: [],
      images: [],
      stocks: [],
    },
    {
      id: 4,
      name: 'Producto Cuatro',
      description: 'Descripción del producto cuatro',
      is_active: true,
      sku: 'SKU-004',
      barcode: '1234567890126',
      price: 40000,
      cost: 20000,
      weight_kg: 4,
      categories: [],
      images: [],
      stocks: [],
    },
    {
      id: 5,
      name: 'Producto Cinco',
      description: 'Descripción del producto cinco',
      is_active: true,
      sku: 'SKU-005',
      barcode: '1234567890127',
      price: 50000,
      cost: 25000,
      weight_kg: 5,
      categories: [],
      images: [],
      stocks: [],
    },
    {
      id: 6,
      name: 'Producto Seis',
      description: 'Descripción del producto seis',
      is_active: true,
      sku: 'SKU-006',
      barcode: '1234567890128',
      price: 60000,
      cost: 30000,
      weight_kg: 6,
      categories: [],
      images: [],
      stocks: [],
    },
    {
      id: 7,
      name: 'Producto Siete',
      description: 'Descripción del producto siete',
      is_active: true,
      sku: 'SKU-007',
      barcode: '1234567890129',
      price: 70000,
      cost: 35000,
      weight_kg: 7,
      categories: [],
      images: [],
      stocks: [],
    },
    {
      id: 8,
      name: 'Producto Ocho',
      description: 'Descripción del producto ocho',
      is_active: true,
      sku: 'SKU-008',
      barcode: '1234567890130',
      price: 80000,
      cost: 40000,
      weight_kg: 8,
      categories: [],
      images: [],
      stocks: [],
    },
    {
      id: 9,
      name: 'Producto Nueve',
      description: 'Descripción del producto nueve',
      is_active: true,
      sku: 'SKU-009',
      barcode: '1234567890131',
      price: 90000,
      cost: 45000,
      weight_kg: 9,
      categories: [],
      images: [],
      stocks: [],
    },
    {
      id: 10,
      name: 'Producto Diez',
      description: 'Descripción del producto diez',
      is_active: true,
      sku: 'SKU-010',
      barcode: '1234567890132',
      price: 100000,
      cost: 50000,
      weight_kg: 10,
      categories: [],
      images: [],
      stocks: [],
    },
  ];

  customers: Customer[] = [
    {
      id: 1,
      rut: '11111111-1',
      first_name: 'Cliente1',
      last_name: 'Uno',
      phone: '+56911111111',
      email: '',
      description: '',
      is_active: true,
      addresses: [],
    },
    {
      id: 2,
      rut: '22222222-2',
      first_name: 'Cliente2',
      last_name: 'Dos',
      phone: '+56922222222',
      email: '',
      description: '',
      is_active: true,
      addresses: [],
    },
    {
      id: 3,
      rut: '33333333-3',
      first_name: 'Cliente3',
      last_name: 'Tres',
      phone: '+56933333333',
      email: '',
      description: '',
      is_active: true,
      addresses: [],
    },
    {
      id: 4,
      rut: '44444444-4',
      first_name: 'Cliente4',
      last_name: 'Cuatro',
      phone: '+56944444444',
      email: '',
      description: '',
      is_active: true,
      addresses: [],
    },
    {
      id: 5,
      rut: '55555555-5',
      first_name: 'Cliente5',
      last_name: 'Cinco',
      phone: '+56955555555',
      email: '',
      description: '',
      is_active: true,
      addresses: [],
    },
  ];
  filteredProducts: Product[] = [];
  addedProducts: CreateInvoiceDetail[] = [];
  total = 0;

  constructor(
    private fb: FormBuilder,
    private titleService: TitleService,
  ) {
    this.titleService.setTitle('Crear factura');
  }

  ngOnInit(): void {
    this.createInvoiceForm = this.fb.group({
      customer: ['', Validators.required],
      selectedProduct: [null],
      quantity: [1, [Validators.required, Validators.min(1)]],
    });
    this.filteredProducts = [...this.products];
  }

  searchProducts(event: string): void {
    const query = event.toLowerCase();
    this.filteredProducts = this.products.filter((product) => product.name.toLowerCase().includes(query));
  }

  addProduct() {
    const selectedProduct = this.createInvoiceForm.get('selectedProduct')?.value;
    const quantity = this.createInvoiceForm.get('quantity')?.value;

    if (selectedProduct && quantity) {
      const productToAdd = {
        product: selectedProduct,
        quantity: quantity,
        cost: selectedProduct.cost,
        price: selectedProduct.price,
        subtotal: selectedProduct.price * quantity,
      };
      this.addedProducts.push(productToAdd);
      this.createInvoiceForm.get('selectedProduct')?.reset();
      this.createInvoiceForm.get('quantity')?.reset();
      this.updateTotal();
    }
  }

  removeProduct(detail: CreateInvoiceDetail): void {
    this.addedProducts = this.addedProducts.filter((d) => d.product.id !== detail.product.id);
    this.updateTotal();
  }

  updateTotal(): void {
    this.total = this.addedProducts.reduce((acc, detail) => acc + detail.subtotal, 0);
  }

  submitInvoice(): void {
    if (this.createInvoiceForm.valid && this.addedProducts.length > 0) {
      const newInvoice: CreateInvoice = {
        customer: this.createInvoiceForm.value.customer,
        date: new Date(),
        total: this.total,
        details: this.addedProducts,
      };

      console.log('Nueva factura creada', newInvoice);
      // Aquí puedes añadir la lógica para guardar la factura en el backend
      this.resetForm();
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

  focusSelectInput(): void {
    if (this.selectInput) {
      this.selectInput.nativeElement.focus();
    }
  }
}
