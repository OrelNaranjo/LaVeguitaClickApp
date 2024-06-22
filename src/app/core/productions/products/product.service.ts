import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { API_BASE_URL } from '../../../shared/config/config';
import { Product, ProductCreationRequest, ProductResponse } from '../../../shared/interfaces/product';
import { Observable } from 'rxjs';
import { Category } from '../../../shared/interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productUrl = `${API_BASE_URL}/products`;
  private categoryUrl = `${API_BASE_URL}/categories`;
  private packageTypeUrl = `${API_BASE_URL}/packageTypes`;
  private imageUrl = `${API_BASE_URL}/images`;

  constructor(private http: HttpClient) {}

  // Product
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl);
  }

  getProductById(id: number) {
    return this.http.get(`${this.productUrl}/${id}`);
  }

  createProduct(product: ProductCreationRequest): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(this.productUrl, product);
  }

  updateProduct(id: number, product: any) {
    return this.http.put(`${this.productUrl}/${id}`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.productUrl}/${id}`);
  }

  // Category
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl);
  }

  getActivesCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl + '/actives');
  }

  getCategoryById(id: number) {
    return this.http.get(`${this.categoryUrl}/${id}`);
  }

  createCategory(category: any) {
    return this.http.post(this.categoryUrl, category);
  }

  updateCategory(id: number, category: any) {
    return this.http.put(`${this.categoryUrl}/${id}`, category);
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.categoryUrl}/${id}`);
  }

  // PackageType
  getAllPackageTypes() {
    return this.http.get(this.packageTypeUrl);
  }

  getPackageTypeById(id: number) {
    return this.http.get(`${this.packageTypeUrl}/${id}`);
  }

  createPackageType(packageType: any) {
    return this.http.post(this.packageTypeUrl, packageType);
  }

  updatePackageType(id: number, packageType: any) {
    return this.http.put(`${this.packageTypeUrl}/${id}`, packageType);
  }

  deletePackageType(id: number) {
    return this.http.delete(`${this.packageTypeUrl}/${id}`);
  }

  // Image
  getAllImages() {
    return this.http.get(this.imageUrl);
  }

  getImageByProductId(productId: number) {
    return this.http.get(`${this.imageUrl}/${productId}`);
  }

  uploadImage(productId: number, image: File, createImageDto: any) {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('createImageDto', JSON.stringify(createImageDto));

    return this.http.post(`${this.imageUrl}/${productId}`, formData);
  }

  deleteImage(imageId: number) {
    return this.http.delete(`${this.imageUrl}/${imageId}`);
  }
}
