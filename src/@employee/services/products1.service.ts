import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { ProductClassification, ProductClassificationId, ProductClassificationList } from '@employee/models/product.model';
import { environment } from 'environments/environment';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Products1Service {

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
    return this.http.get<ProductClassificationList[]>(`${environment.apiUrl}/ProductClassification?sortOrder=${sortOrder}`);
  }
  
  // Get Product Classification by ID
  public getProductClassificationId(productId: number): Observable<any[]>{
    return this.http.get<ProductClassificationId[]>(`${environment.apiUrl}/ProductClassification/${productId}`);
  }

  // Create Product Classification
  createProductClassification(product: ProductClassification): Observable<ProductClassification[]>{
    return this.http.post<ProductClassification[]>(`${environment.apiUrl}/ProductClassification`, product);
  }

  // Edit Product Classification
  public editProductClassification(product: ProductClassification): Observable<ProductClassification[]>{
    return this.http.put<ProductClassification[]>(`${environment.apiUrl}/ProductClassification`, product);
  }

  // Edit Product Classification by ID
  public editProductClassificationId(productId: number, product: ProductClassification): Observable<ProductClassification[]>{
    return this.http.put<ProductClassification[]>(`${environment.apiUrl}/ProductClassification/${productId}`, product);
  }

  // Delete Product Classification
  public deleteProductClassification(productId: number): Observable<any[]>{
    return this.http.delete<ProductClassification[]>(`${environment.apiUrl}/ProductClassification/${productId}`);
  }

  // Delete Multiple Product Classification Ids
  deleteMultipleIds(productIds: number[]): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/ProductClassification/delete-multiple`, { body: productIds });
  }

  // Upload Product Classification Ids
  uploadFiles(data): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/ProductClassification/upload`, data);
  }

}
