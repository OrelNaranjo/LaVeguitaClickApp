// CustomersState
import { Injectable } from '@angular/core';
import { CustomersService } from '@core/services';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { LoadCustomers, CreateCustomer, UpdateCustomer, DeleteCustomer } from '../actions';
import { tap } from 'rxjs/operators';
import { Customer, CustomersStateModel } from '@shared/interfaces';

@State<CustomersStateModel>({
  name: 'customers',
  defaults: {
    customers: [],
  },
})
@Injectable()
export class CustomersState {
  constructor(private customersService: CustomersService) {}

  @Selector()
  static getCustomers(state: CustomersStateModel) {
    return state.customers;
  }

  @Action(LoadCustomers)
  loadCustomers(ctx: StateContext<CustomersStateModel>) {
    const state = ctx.getState();
    if (state.customers.length > 0) {
      return;
    }
    return this.customersService.getCustomers().pipe(
      tap((response: Customer) => {
        if (Array.isArray(response) && response.length > 0) {
          ctx.patchState({
            customers: response,
          });
        }
      }),
    );
  }

  @Action(CreateCustomer)
  createCustomer(ctx: StateContext<CustomersStateModel>, action: CreateCustomer) {
    return this.customersService.createCustomer(action.payload).pipe(
      tap((response: Customer) => {
        ctx.patchState({
          customers: [...ctx.getState().customers, response],
        });
      }),
    );
  }

  @Action(UpdateCustomer)
  updateCustomer(ctx: StateContext<CustomersStateModel>, action: UpdateCustomer) {
    return this.customersService.updateCustomer(action.payload).pipe(
      tap((response: Customer) => {
        ctx.patchState({
          customers: ctx.getState().customers.map((customer) => {
            if (customer.id === response.id) {
              return response;
            }
            return customer;
          }),
        });
      }),
    );
  }

  @Action(DeleteCustomer)
  deleteCustomer(ctx: StateContext<CustomersStateModel>, action: DeleteCustomer) {
    return this.customersService.deleteCustomer(action.payload).pipe(
      tap(() => {
        ctx.patchState({
          customers: ctx.getState().customers.filter((customer) => customer.id !== action.payload),
        });
      }),
    );
  }
}
