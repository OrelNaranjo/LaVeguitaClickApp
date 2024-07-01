import { Injectable } from '@angular/core';
import { ProductService } from '@core/services';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { LoadProducts, CreateProduct, UpdateProduct, DeleteProduct } from '../actions';
import { tap } from 'rxjs/operators';
import { Product, ProductStateModel } from '@shared/interfaces';

@State<ProductStateModel>({
  name: 'products',
  defaults: {
    products: [],
  },
})
@Injectable()
export class ProductsState {
  constructor(private productService: ProductService) {}

  @Selector()
  static getProducts(state: ProductStateModel) {
    return state.products;
  }

  @Action(LoadProducts)
  loadProducts(ctx: StateContext<ProductStateModel>) {
    console.log('Loading products');
    const state = ctx.getState();
    if (state.products.length > 0) {
      return;
    }
    return this.productService.getProducts().pipe(
      tap((response: Product) => {
        if (Array.isArray(response) && response.length > 0) {
          ctx.patchState({
            products: response,
          });
        }
        console.log('Products loaded', response);
      }),
    );
  }

  @Action(CreateProduct)
  createProduct(ctx: StateContext<ProductStateModel>, action: CreateProduct) {
    return this.productService.createProduct(action.payload).pipe(
      tap((response: Product) => {
        ctx.patchState({
          products: [...ctx.getState().products, response],
        });
      }),
    );
  }

  @Action(UpdateProduct)
  updateProduct(ctx: StateContext<ProductStateModel>, action: UpdateProduct) {
    return this.productService.updateProduct(action.payload).pipe(
      tap((response: Product) => {
        ctx.patchState({
          products: ctx.getState().products.map((product) => {
            if (product.id === response.id) {
              return response;
            }
            return product;
          }),
        });
      }),
    );
  }

  @Action(DeleteProduct)
  deleteProduct(ctx: StateContext<ProductStateModel>, action: DeleteProduct) {
    return this.productService.deleteProduct(action.payload).pipe(
      tap(() => {
        ctx.patchState({
          products: ctx.getState().products.filter((product) => product.id !== action.payload),
        });
      }),
    );
  }
}
