import { Injectable } from '@angular/core';
import { AddressService } from '../../services/address/address.service';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Country, CountryStateModel } from '@shared/interfaces';
import { LoadCountries } from '../actions/country.action';
import { tap } from 'rxjs';

@State<CountryStateModel>({
  name: 'countryState',
  defaults: {
    countries: [],
  },
})
@Injectable()
export class CountryState {
  constructor(private addressService: AddressService) {}

  @Selector()
  static getCountries(state: CountryStateModel) {
    return state.countries;
  }

  @Action(LoadCountries)
  loadCountries(ctx: StateContext<CountryStateModel>) {
    const stateCountry = ctx.getState();
    if (stateCountry.countries.length > 0) {
      return;
    }
    return this.addressService.getCountries().pipe(
      tap((response: Country) => {
        if (Array.isArray(response) && response.length > 0) {
          ctx.patchState({
            countries: response,
          });
        }
      }),
    );
  }
}
