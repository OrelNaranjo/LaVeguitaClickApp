import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Address } from '@shared/interfaces';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { TitleService } from '@core/services';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngxs/store';
import { AddressComponent } from '@components/index';
import { CreateCustomer } from '@core/stores';
import { NzTableComponent } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-new-customer',
  standalone: true,
  imports: [ReactiveFormsModule, AddressComponent, NzTableComponent, NzRowDirective, NzColDirective, MatIconModule],
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss'],
})
export class NewCustomerComponent {
  customerForm: FormGroup;
  addresses: Address[] = [];
  showAddress = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly titleService: TitleService,
    private readonly router: Router,
    private readonly store: Store,
  ) {
    this.titleService.setTitle('Nuevo cliente');
    this.customerForm = this.fb.group({
      rut: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required]],
      description: [''],
    });
  }

  newAddress() {
    this.showAddress = true;
  }

  onBack() {
    this.router.navigate(['/sales/clients']);
  }

  onAddressSubmit(address: Address) {
    this.showAddress = false;
    this.addresses = [...this.addresses, address];
  }

  onAddressCancel() {
    this.showAddress = false;
  }

  deleteAddress(index: number) {
    this.addresses = this.addresses.filter((_, i) => i !== index);
  }

  onSubmit() {
    if (this.customerForm.valid && this.addresses.length > 0) {
      const customerData = {
        ...this.customerForm.value,
        addresses: this.addresses.map((address) => ({
          street: address.street,
          zip_code: address.zip_code,
          commune: {
            id: address.commune.id,
            name: address.commune.name,
          },
        })),
      };
      this.store.dispatch(new CreateCustomer(customerData));
      this.router.navigate(['/sales/clients']);
    }
  }
}
