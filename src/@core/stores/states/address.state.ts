import { Injectable } from '@angular/core';
import { AddressService } from '../../services/address/address.service';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Address, AddressStateModel } from '@shared/interfaces';
import { tap } from 'rxjs';
import { LoadAddress } from '../actions';

@State<AddressStateModel>({
  name: 'addressState',
  defaults: {
    addresses: [],
  },
})
@Injectable()
export class AddressState {
  constructor(private addressService: AddressService) {}

  @Selector()
  static getAddress(state: AddressStateModel) {
    return state.addresses;
  }

  @Action(LoadAddress)
  loadAddresses(ctx: StateContext<AddressStateModel>) {
    const stateAddress = ctx.getState();
    if (stateAddress.addresses.length > 0) {
      return;
    }
    return this.addressService.getAddresses().pipe(
      tap((response: Address) => {
        if (Array.isArray(response) && response.length > 0) {
          ctx.patchState({
            addresses: response,
          });
        }
      }),
    );
  }
}
