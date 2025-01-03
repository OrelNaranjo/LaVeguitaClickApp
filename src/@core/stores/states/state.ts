import { AddressState } from './address.state';
import { CityState } from './city.state';
import { CommuneState } from './commune.state';
import { CountryState } from './country.state';
import { CustomersState } from './customers.state';
import { InvoicesState } from './invoice.state';
import { OrdersState } from './orders.state';
import { ProductsState } from './products.state';
import { RegionState } from './region.state';
import { SuppliersState } from './suppliers.state';

export const states = [
  CustomersState,
  AddressState,
  CountryState,
  RegionState,
  CityState,
  CommuneState,
  ProductsState,
  InvoicesState,
  OrdersState,
  SuppliersState,
];
