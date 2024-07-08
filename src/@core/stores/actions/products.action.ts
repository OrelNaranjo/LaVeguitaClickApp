import { Product } from '@shared/interfaces';

export class LoadProducts {
  static readonly type = '[Products] Load Products';
}

export class CreateProduct {
  static readonly type = '[Products] Create Products';
  constructor(public payload: Product) {}
}

export class UpdateProduct {
  static readonly type = '[Products] Update Products';
  constructor(public payload: Product) {}
}

export class DeleteProduct {
  static readonly type = '[Products] Delete Products';
  constructor(public payload: number) {}
}
