import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { InvoiceRequestStateModel, InvoiceStateModel } from '../../../@shared';
import { CreateInvoice } from '../actions/invoices.action';
import { InvoiceService } from '@core/services';

@State<InvoiceStateModel>({
  name: 'invoicesRequest',
  defaults: {
    invoices: [],
  },
})
@Injectable()
export class InvoicesRequestState {
  constructor(private invoiceService: InvoiceService) {}

  @Action(CreateInvoice)
  createInvoice(ctx: StateContext<InvoiceRequestStateModel>, action: CreateInvoice) {
    return this.invoiceService.createInvoice(action.payload);
  }
}
