import { Injectable } from '@angular/core';
import { AddressService } from '../../services/address/address.service';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Region, RegionStateModel } from '@shared/interfaces';
import { LoadRegions } from '../actions/region.action';
import { tap } from 'rxjs';

@State<RegionStateModel>({
  name: 'regionState',
  defaults: {
    regions: [],
  },
})
@Injectable()
export class RegionState {
  constructor(private addressService: AddressService) {}

  @Selector()
  static getRegions(state: RegionStateModel) {
    return state.regions;
  }

  @Action(LoadRegions)
  loadRegions(ctx: StateContext<RegionStateModel>) {
    const stateRegion = ctx.getState();
    if (stateRegion.regions.length > 0) {
      return;
    }
    return this.addressService.getRegions().pipe(
      tap((response: Region) => {
        if (Array.isArray(response) && response.length > 0) {
          ctx.patchState({
            regions: response,
          });
        }
      }),
    );
  }
}
