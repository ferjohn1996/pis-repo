import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Line, PlanningById, PlanningList, PlanningPost } from '@employee/models/planning.model';
import { environment } from 'environments/environment';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Planning1Service {

  private url: "https://localhost:7040/api";

  constructor ( private http: HttpClient ) 
  {
   
  }

  // Get Planning list with Descending order
  getPlanningList(sortOrder: string = 'asc'): Observable<PlanningList[]> {
    return this.http.get<PlanningList[]>(`https://localhost:7040/api/PlanningRequest?sortOrder=${sortOrder}`);
  }
  
  // Get Planning by ID
  getPlanningId(id: number): Observable<any[]>{
    return this.http.get<PlanningById[]>(`https://localhost:7040/api/PlanningRequest/${id}`);
  }

  // Create Planning
  createPlanning(data: PlanningPost): Observable<PlanningPost>{
    return this.http.post<PlanningPost>(`https://localhost:7040/api/PlanningRequest`, data);
  }

  // Create Planning Line 1
  createPlanningLine1(data: Line): Observable<Line>{
    return this.http.post<Line>(`https://localhost:7040/api/PlanningRequest/line1`, data);
  }

  // Create Planning Line 2
  createPlanningLine2(data: Line): Observable<Line>{
    return this.http.post<Line>(`https://localhost:7040/api/PlanningRequest/line2`, data);
  }

  // Create Planning Line 3
  createPlanningLine3(data: Line): Observable<Line>{
    return this.http.post<Line>(`https://localhost:7040/api/PlanningRequest/line3`, data);
  }

  // Get Planning Line 1
  getPlanningLine1ById(id:number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get(`https://localhost:7040/api/PlanningRequest/line1/${id}`)
        .subscribe((response: any) => {
            resolve(response);
        }, reject);
    });
  }

  // Get Planning Line 2
  getPlanningLine2ById(id:number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get(`https://localhost:7040/api/PlanningRequest/line2/${id}`)
        .subscribe((response: any) => {
            resolve(response);
        }, reject);
    });
  }

  // Get Planning Line 3
  getPlanningLine3ById(id:number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get(`https://localhost:7040/api/PlanningRequest/line3/${id}`)
        .subscribe((response: any) => {
            resolve(response);
        }, reject);
    });
  }

  // Edit Planning Line 1
  editPlanningLine1(id: number, data: Line): Observable<Line>{
    return this.http.put<Line>(`https://localhost:7040/api/PlanningRequest/line1/${id}`, data);
  }

  // Edit Planning Line 2
  editPlanningLine2(id: number, data: Line): Observable<Line>{
    return this.http.put<Line>(`https://localhost:7040/api/PlanningRequest/line2/${id}`, data);
  }

  // Edit Planning Line 3
  editPlanningLine3(id: number, data: Line): Observable<Line>{
    return this.http.put<Line>(`https://localhost:7040/api/PlanningRequest/line3/${id}`, data);
  }

  // Edit Planning by ID
  editPlanningById(id: number, data: PlanningById): Observable<PlanningById[]>{
    return this.http.put<PlanningById[]>(`https://localhost:7040/api/PlanningRequest/${id}`, data);
  }

  // Delete Planning by ID
  deletePlanningById(id: number): Observable<any[]>{
    return this.http.delete<PlanningList[]>(`https://localhost:7040/api/PlanningRequest/${id}`);
  }

  getProductForOptions(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get(`https://localhost:7040/api/ProductClassification/list`)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

  getProducIdOptions(productId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get(`https://localhost:7040/api/ProductClassification/${productId}`)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

  getPlanningById(id:number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get(`https://localhost:7040/api/PlanningRequest/${id}`)
        .subscribe((response: any) => {
            resolve(response);
        }, reject);
    });
  }

}
