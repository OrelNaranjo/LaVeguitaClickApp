import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { Invoice, InvoiceStateModel } from '../../../@shared';
import { InvoiceService } from '@core/services';
import { LoadInvoices } from '../actions'

@State<InvoiceStateModel>({
  name: 'invoices',
  defaults: {
    invoices: [],
  },
})
@Injectable()
export class InvoicesState {
  constructor(private invoiceService: InvoiceService) {}

  @Selector()
  static getInvoices(state: InvoiceStateModel) {
    return state.invoices;
  }

  @Action(LoadInvoices)
  loadInvoices(ctx: StateContext<InvoiceStateModel>, { force = false }: { force?: boolean }) {
    const state = ctx.getState();
    if (!force && state.invoices.length > 0) {
      return;
    }
    return this.invoiceService.getInvoices().pipe(
      tap((response: Invoice) => {
        if (Array.isArray(response) && response.length > 0) {
          ctx.patchState({
            invoices: response,
          });
        }
      }),
    );
  }
}
