import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { ProductClassification, ProductClassificationId, ProductClassificationList } from '@employee/models/product.model';
import { environment } from 'environments/environment';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  //private url = "http://10.17.96.45:85/api/ProductClassification";
  private url: "https://localhost:7040/api/ProductClassification";

  // Declare an event emitter
  productUpdated = new EventEmitter<void>();

  constructor ( private http: HttpClient ) 
  {
   
  }

  // Get Product Classification list
  // public getProductClassification(): Observable<ProductClassification[]> {
  //   return this.http.get<ProductClassification[]>(`https://localhost:7040/api/${this.url}`);
  // }

  // Get Product Classification list with Descending order
  public getProductClassification(sortOrder: string = 'asc'): Observable<ProductClassificationList[]> {
    return this.http.get<ProductClassificationList[]>(`${this.url}?sortOrder=${sortOrder}`);
  }
  
  // Get Product Classification by ID
  public getProductClassificationId(productId: number): Observable<any[]>{
    return this.http.get<ProductClassificationId[]>(`${this.url}/${productId}`);
  }

  // Create Product Classification
  createProductClassification(product: ProductClassification): Observable<ProductClassification[]>{
    return this.http.post<ProductClassification[]>(`${this.url}`, product);
  }

  // Edit Product Classification
  public editProductClassification(product: ProductClassification): Observable<ProductClassification[]>{
    return this.http.put<ProductClassification[]>(`${this.url}`, product);
  }

  // Edit Product Classification by ID
  public editProductClassificationId(productId: number, product: ProductClassification): Observable<ProductClassification[]>{
    return this.http.put<ProductClassification[]>(`${this.url}/${productId}`, product);
  }

  // Delete Product Classification
  public deleteProductClassification(productId: number): Observable<any[]>{
    return this.http.delete<ProductClassification[]>(`${this.url}/${productId}`);
  }

  // Delete Multiple Product Classification Ids
  deleteMultipleIds(productIds: number[]): Observable<any> {
    return this.http.delete<any>(`${this.url}/delete-multiple`, { body: productIds });
  }

  // Upload Product Classification Ids
  uploadFiles(data): Observable<any> {
    return this.http.post<any>(`${this.url}/upload`, data);
  }

}
