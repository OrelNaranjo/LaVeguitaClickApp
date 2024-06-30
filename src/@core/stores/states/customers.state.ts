// CustomersState
import { Injectable } from '@angular/core';
import { CustomersService } from '@core/services';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { LoadCustomers } from '../actions';
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
}
