import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@config/environments';
import { Product, Category, PackageType } from '@shared/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private categoryUrl = `${environment.API_URL}categories`;
  private packageTypeUrl = `${environment.API_URL}packageTypes`;
  private imageUrl = `${environment.API_URL}images`;

  constructor(private http: HttpClient) {}

  // Product
  getProducts(): Observable<Product> {
    return this.http.get<Product>(`${environment.API_URL}products`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.API_URL}products`, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.patch<Product>(`${environment.API_URL}products/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${environment.API_URL}products/${id}`);
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

  createCategory(category: unknown) {
    return this.http.post(this.categoryUrl, category);
  }

  updateCategory(id: number, category: Category) {
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

  createPackageType(packageType: PackageType) {
    return this.http.post(this.packageTypeUrl, packageType);
  }

  updatePackageType(id: number, packageType: PackageType) {
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

  uploadImage(productId: number, image: File, createImageDto: unknown) {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('createImageDto', JSON.stringify(createImageDto));

    return this.http.post(`${this.imageUrl}/${productId}`, formData);
  }

  deleteImage(imageId: number) {
    return this.http.delete(`${this.imageUrl}/${imageId}`);
  }
}
