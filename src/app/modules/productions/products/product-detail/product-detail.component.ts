import { CurrencyPipe } from '@core/pipes';
import { Component } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [QRCodeModule, CurrencyPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  product = {
    id: 1,
    codigo_barra: '002233325',
    sku: 'LECHUGA-25',
    nombre: 'Lechuga Crespa',
    description: 'Lechuga importada de la mejor calidad, fresca y crujiente. Ideal para ensaladas y platos frescos.',
    precio: 1000,
    descontinuado: true,
    se_vende: true,
    se_compra: true,
    stock_minimo: 10,
    stock_maximo: 100,
    embalaje: 'Unidad',
    peso: 0.5,
    ancho: 15.0,
    alto: 15.0,
    largo: 15.0,
    imagen: 'https://images.rappi.cl/products/2090937034-1595896219413.jpg?e=webp&q=80&d=130x130',
  };
}
