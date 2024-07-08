import { Injectable } from '@angular/core';
import { AddressService } from '../../services/address/address.service';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Commune, CommuneStateModel } from '@shared/interfaces';
import { LoadCommunes } from '../actions';
import { tap } from 'rxjs';

@State<CommuneStateModel>({
  name: 'communeState',
  defaults: {
    communes: [],
  },
})
@Injectable()
export class CommuneState {
  constructor(private addressService: AddressService) {}

  @Selector()
  static getCommunes(state: CommuneStateModel) {
    return state.communes;
  }

  @Action(LoadCommunes)
  loadCommunes(ctx: StateContext<CommuneStateModel>) {
    const stateCommune = ctx.getState();
    if (stateCommune.communes.length > 0) {
      return;
    }
    return this.addressService.getCommunes().pipe(
      tap((response: Commune) => {
        if (Array.isArray(response) && response.length > 0) {
          ctx.patchState({
            communes: response,
          });
        }
      }),
    );
  }
}
