import { Category } from './category';
import { Image } from './image';
import { Stock } from './stock';

export interface Product {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  sku: string;
  barcode: string;
  price: number;
  cost: number;
  weight_kg: number;
  categories: Category[];
  images: Image[];
  stocks: Stock[];
}

export interface ProductCreationRequest {
  name: string;
  description: string;
  sku: string;
  barcode: string;
  price: number;
  cost: number;
  weight_kg: number;
  categories?: Category[];
}

export interface ProductResponse {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  sku: string;
  barcode: string;
  price: number;
  cost: number;
  weight_kg: number;
  categories: Category[];
  images: Image[];
}

export interface ImageCreationRequest {
  url: string;
  alt: string;
  product: number;
}
