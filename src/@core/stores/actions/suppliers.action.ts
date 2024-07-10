import { Supplier } from '@shared/interfaces';

export class LoadSuppliers {
  static readonly type = '[Suppliers] Load Suppliers';
}

export class CreateSupplier {
  static readonly type = '[Suppliers] Create Supplier';
  constructor(public payload: Supplier) {}
}

export class UpdateSupplier {
  static readonly type = '[Suppliers] Update Supplier';
  constructor(public payload: Supplier) {}
}

export class DeleteSupplier {
  static readonly type = '[Suppliers] Delete Supplier';
  constructor(public payload: number) {}
}
