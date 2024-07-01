import { Injectable } from '@angular/core';
import { AddressService } from '../../services/address/address.service';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { City, CityStateModel } from '@shared/interfaces';
import { LoadCities } from '../actions';
import { tap } from 'rxjs';

@State<CityStateModel>({
  name: 'cityState',
  defaults: {
    cities: [],
  },
})

@Injectable()
export class CityState {
  constructor(private addressService: AddressService) {}

  @Selector()
  static getCities(state: CityStateModel) {
    return state.cities;
  }

  @Action(LoadCities)
  loadCities(ctx: StateContext<CityStateModel>) {
    const stateCity = ctx.getState();
    if (stateCity.cities.length > 0) {
      return;
    }
    return this.addressService.getCities().pipe(
      tap((response: City) => {
        if (Array.isArray(response) && response.length > 0) {
          ctx.patchState({
            cities: response,
          });
        }
      }),
    );
  }
}
