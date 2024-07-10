import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { LoadSuppliers, CreateSupplier, UpdateSupplier, DeleteSupplier } from '../actions';
import { tap } from 'rxjs/operators';
import { Supplier, SuppliersStateModel } from '@shared/interfaces';
import { SupplierService } from '../../services/suppliers/supplier.service'

@State<SuppliersStateModel>({
  name: 'suppliers',
  defaults: {
    suppliers: [],
  },
})
@Injectable()
export class SuppliersState {
  constructor(private supplierService: SupplierService) {}

  @Selector()
  static getSuppliers(state: SuppliersStateModel) {
    return state.suppliers;
  }

  @Action(LoadSuppliers)
  loadSuppliers(ctx: StateContext<SuppliersStateModel>) {
    const state = ctx.getState();
    if (state.suppliers.length > 0) {
      return;
    }
    return this.supplierService.getSuppliers().pipe(
      tap((response: Supplier) => {
        if (Array.isArray(response) && response.length > 0) {
          ctx.patchState({
            suppliers: response,
          });
        }
      }),
    );
  }

  @Action(CreateSupplier)
  createSupplier(ctx: StateContext<SuppliersStateModel>, action: CreateSupplier) {
    return this.supplierService.createSupplier(action.payload).pipe(
      tap((response: Supplier) => {
        ctx.patchState({
          suppliers: [...ctx.getState().suppliers, response],
        });
      }),
    );
  }

  @Action(UpdateSupplier)
  updateSupplier(ctx: StateContext<SuppliersStateModel>, action: UpdateSupplier) {
    return this.supplierService.updateSupplier(action.payload).pipe(
      tap((response: Supplier) => {
        ctx.patchState({
          suppliers: ctx.getState().suppliers.map((supplier) => {
            if (supplier.id === response.id) {
              return response;
            }
            return supplier;
          }),
        });
      }),
    );
  }

  @Action(DeleteSupplier)
  deleteSupplier(ctx: StateContext<SuppliersStateModel>, action: DeleteSupplier) {
    return this.supplierService.deleteSupplier(action.payload).pipe(
      tap(() => {
        ctx.patchState({
          suppliers: ctx.getState().suppliers.filter((supplier) => supplier.id !== action.payload),
        });
      }),
    );
  }
}
