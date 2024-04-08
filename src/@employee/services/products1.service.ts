import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { ProductClassification, ProductClassificationId, ProductClassificationList } from '@employee/models/product.model';
import { environment } from 'environments/environment';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Products1Service {

  private url: "https://localhost:7040/api";

  // Declare an event emitter
  productUpdated = new EventEmitter<void>();

  constructor ( private http: HttpClient ) 
  {
   
  }

  // Get Product Classification list with Descending order
  getProductClassification(sortOrder: string = 'asc'): Observable<ProductClassificationList[]> {
    return this.http.get<ProductClassificationList[]>(`https://localhost:7040/api/ProductClassification?sortOrder=${sortOrder}`);
  }
  
  // Get Product Classification by ID
  getProductClassificationId(productId: number): Observable<any[]>{
    return this.http.get<ProductClassificationId[]>(`https://localhost:7040/api/ProductClassification/${productId}`);
  }

  // Create Product Classification
  createProductClassification(product: ProductClassification): Observable<ProductClassification[]>{
    return this.http.post<ProductClassification[]>(`https://localhost:7040/api/ProductClassification`, product);
  }

  // Edit Product Classification
  editProductClassification(product: ProductClassification): Observable<ProductClassification[]>{
    return this.http.put<ProductClassification[]>(`https://localhost:7040/api/ProductClassification`, product);
  }

  // Edit Product Classification by ID
  editProductClassificationId(productId: number, product: ProductClassification): Observable<ProductClassification[]>{
    return this.http.put<ProductClassification[]>(`https://localhost:7040/api/ProductClassification/${productId}`, product);
  }

  // Delete Product Classification
  deleteProductClassification(productId: number): Observable<any[]>{
    return this.http.delete<ProductClassification[]>(`https://localhost:7040/api/ProductClassification/${productId}`);
  }

  // Delete Multiple Product Classification Ids
  deleteMultipleIds(productIds: number[]): Observable<any> {
    return this.http.delete<any>(`https://localhost:7040/api/ProductClassification/delete-multiple`, { body: productIds });
  }

  // Upload Product Classification Ids
  uploadFiles(data): Observable<any> {
    return this.http.post<any>(`https://localhost:7040/api/ProductClassification/upload`, data);
  }

}
