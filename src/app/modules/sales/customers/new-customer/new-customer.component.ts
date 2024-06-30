import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddressComponent } from '../../../../../@components';
import { Address } from '../../../../../@shared';

@Component({
  selector: 'app-new-customer',
  standalone: true,
  imports: [ReactiveFormsModule, AddressComponent],
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss'],
})
export class NewCustomerComponent {
  customerForm: FormGroup;
  addresses: Address[] = [];

  constructor(private fb: FormBuilder) {
    this.customerForm = this.fb.group({
      rut: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required]],
      description: [''],
    });
  }

  onAddressSubmit(address: Address) {
    this.addresses.push(address);
    console.log('Addresses:', this.addresses);
  }
onSubmit() {
  console.log('Iniciando onSubmit');
  console.log('Estado del formulario:', this.customerForm.valid);
  console.log('Número de direcciones:', this.addresses.length);

  if (this.customerForm.valid && this.addresses.length > 0) {
    console.log('Formulario válido y al menos una dirección presente');
    const customerData = {
      ...this.customerForm.value,
      addresses: this.addresses.map((address) => ({
        street: address.street,
        zip_code: address.zip_code,
        commune: {
          id: address.commune.id,
        },
      })),
    };
    console.log('Datos completos del cliente:', customerData);
  } else {
    if (!this.customerForm.valid) {
      console.log('El formulario no es válido');
    }
    if (this.addresses.length === 0) {
      console.log('No hay direcciones agregadas');
    }
  }
}
}
