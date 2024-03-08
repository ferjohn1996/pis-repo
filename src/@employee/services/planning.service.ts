import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Line, PlanningById, PlanningList, PlanningPost } from '@employee/models/planning.model';
import { environment } from 'environments/environment';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  private url = "http://10.17.96.45:85/api/PlanningRequest";
  private urlOnly = "http://10.17.96.45:85/api";

  constructor ( private http: HttpClient ) 
  {
   
  }

  // Get Planning list with Descending order
  public getPlanningList(sortOrder: string = 'asc'): Observable<PlanningList[]> {
    return this.http.get<PlanningList[]>(`${this.url}?sortOrder=${sortOrder}`);
  }
  
  // Get Planning by ID
  public getPlanningId(id: number): Observable<any[]>{
    return this.http.get<PlanningById[]>(`${this.url}/${id}`);
  }

  // Create Planning
  public createPlanning(data: PlanningPost): Observable<PlanningPost>{
    return this.http.post<PlanningPost>(`${this.url}`, data);
  }

  // Create Planning Line 1
  public createPlanningLine1(data: Line): Observable<Line>{
    return this.http.post<Line>(`${this.url}/line1`, data);
  }

  // Edit Planning by ID
  public editPlanningById(id: number, data: PlanningById): Observable<PlanningById[]>{
    return this.http.put<PlanningById[]>(`${this.url}/${id}`, data);
  }

  // Delete Planning by ID
  public deletePlanningById(id: number): Observable<any[]>{
    return this.http.delete<PlanningList[]>(`${this.url}/${id}`);
  }

  getProductForOptions(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.urlOnly}/ProductClassification/list`)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

  getProducIdOptions(productId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.urlOnly}/ProductClassification/${productId}`)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

}
