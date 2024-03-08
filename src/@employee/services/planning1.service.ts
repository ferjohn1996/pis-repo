import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Line, PlanningById, PlanningList, PlanningPost } from '@employee/models/planning.model';
import { environment } from 'environments/environment';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Planning1Service {

  private url: "https://localhost:7040/api/PlanningRequest";
  private urlOnly = "https://localhost:7040/api";

  constructor ( private http: HttpClient ) 
  {
   
  }

  // Get Planning list with Descending order
  public getPlanningList(sortOrder: string = 'asc'): Observable<PlanningList[]> {
    return this.http.get<PlanningList[]>(`${environment.apiUrl}/PlanningRequest?sortOrder=${sortOrder}`);
  }
  
  // Get Planning by ID
  public getPlanningId(id: number): Observable<any[]>{
    return this.http.get<PlanningById[]>(`${environment.apiUrl}/PlanningRequest/${id}`);
  }

  // Create Planning
  public createPlanning(data: PlanningPost): Observable<PlanningPost>{
    return this.http.post<PlanningPost>(`${environment.apiUrl}/PlanningRequest`, data);
  }

  // Create Planning Line 1
  public createPlanningLine1(data: Line): Observable<Line>{
    return this.http.post<Line>(`${environment.apiUrl}/PlanningRequest/line1`, data);
  }

  // Create Planning Line 2
  public createPlanningLine2(data: Line): Observable<Line>{
    return this.http.post<Line>(`${environment.apiUrl}/PlanningRequest/line2`, data);
  }

  // Create Planning Line 3
  public createPlanningLine3(data: Line): Observable<Line>{
    return this.http.post<Line>(`${environment.apiUrl}/PlanningRequest/line3`, data);
  }

  // Get Planning Line 1
  getPlanningLine1ById(id:number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${environment.apiUrl}/PlanningRequest/line1/${id}`)
        .subscribe((response: any) => {
            resolve(response);
        }, reject);
    });
  }

  // Get Planning Line 2
  getPlanningLine2ById(id:number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${environment.apiUrl}/PlanningRequest/line2/${id}`)
        .subscribe((response: any) => {
            resolve(response);
        }, reject);
    });
  }

  // Get Planning Line 3
  getPlanningLine3ById(id:number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${environment.apiUrl}/PlanningRequest/line3/${id}`)
        .subscribe((response: any) => {
            resolve(response);
        }, reject);
    });
  }

  // Edit Planning Line 1
  public editPlanningLine1(id: number, data: Line): Observable<Line>{
    return this.http.put<Line>(`${environment.apiUrl}/PlanningRequest/line1/${id}`, data);
  }

  // Edit Planning Line 2
  public editPlanningLine2(id: number, data: Line): Observable<Line>{
    return this.http.put<Line>(`${environment.apiUrl}/PlanningRequest/line2/${id}`, data);
  }

  // Edit Planning Line 3
  public editPlanningLine3(id: number, data: Line): Observable<Line>{
    return this.http.put<Line>(`${environment.apiUrl}/PlanningRequest/line3/${id}`, data);
  }

  // Edit Planning by ID
  public editPlanningById(id: number, data: PlanningById): Observable<PlanningById[]>{
    return this.http.put<PlanningById[]>(`${environment.apiUrl}/PlanningRequest/${id}`, data);
  }

  // Delete Planning by ID
  public deletePlanningById(id: number): Observable<any[]>{
    return this.http.delete<PlanningList[]>(`${environment.apiUrl}/PlanningRequest/${id}`);
  }

  getProductForOptions(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${environment.apiUrl}/ProductClassification/list`)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

  getProducIdOptions(productId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${environment.apiUrl}/ProductClassification/${productId}`)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

  getPlanningById(id:number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${environment.apiUrl}/PlanningRequest/${id}`)
        .subscribe((response: any) => {
            resolve(response);
        }, reject);
    });
  }

  

}
