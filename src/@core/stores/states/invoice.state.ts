import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { Invoice, InvoiceStateModel } from '../../../@shared';
import { InvoiceService } from '@core/services';
import { CreateInvoice, LoadInvoices } from '../actions';
import { SelectInvoice } from '../actions/invoices.action';

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

  @Selector()
  static getSelectedInvoice(state: InvoiceStateModel): Invoice | undefined {
    return state.selectedInvoice;
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

  @Action(CreateInvoice)
  createInvoice(ctx: StateContext<InvoiceStateModel>, action: CreateInvoice) {
    return this.invoiceService.createInvoice(action.payload).pipe(
      tap((response: Invoice) => {
        const state = ctx.getState();
        ctx.patchState({
          invoices: [...state.invoices, response],
        });
      }),
    );
  }

  @Action(SelectInvoice)
  selectInvoice(ctx: StateContext<InvoiceStateModel>, action: SelectInvoice) {
    const state = ctx.getState();
    const selectedInvoice = state.invoices.find((invoice) => invoice.id === action.id);
    ctx.patchState({
      selectedInvoice: selectedInvoice,
    });
  }
}
