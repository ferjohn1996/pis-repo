import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { DowntimeGuide, DowntimeGuideId, DowntimeGuideList } from '@employee/models/downtime.model';
import { environment } from 'environments/environment';


import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DowntimeGuide1Service {

  // Declare an event emitter
  productUpdated = new EventEmitter<void>();

  constructor ( private http: HttpClient ) 
  {
   
  }

  // Get Downtime Guide list
  // public getDowntimeGuideList(): Observable<DowntimeGuideList[]> {
  //   return this.http.get<DowntimeGuideList[]>(`${environment.apiUrl}/${this.url}`);
  // }

  // Get Downtime Guide with Descending order
  public getDowntimeGuideList(sortOrder: string = 'asc'): Observable<DowntimeGuideList[]> {
    return this.http.get<DowntimeGuideList[]>(`${environment.apiUrl}/DowntimeGuide?sortOrder=${sortOrder}`);
  }

  // Get Downtime Guide by ID
  public getDowntimeGuideId(Id: number): Observable<any[]>{
    return this.http.get<DowntimeGuideId[]>(`${environment.apiUrl}/DowntimeGuide/${Id}`);
  }

  // Create Downtime Guide
  public createDowntimeGuide(data: DowntimeGuide): Observable<DowntimeGuide[]>{
    return this.http.post<DowntimeGuide[]>(`${environment.apiUrl}/DowntimeGuide`, data);
  }

  // Edit Downtime Guide
  public editDowntimeGuide(data: DowntimeGuide): Observable<DowntimeGuide[]>{
    return this.http.put<DowntimeGuide[]>(`${environment.apiUrl}/DowntimeGuide`, data);
  }

  // Edit Downtime Guide by ID
  public editDowntimeGuideId(Id: number, downtime: DowntimeGuide): Observable<DowntimeGuide[]>{
    return this.http.put<DowntimeGuide[]>(`${environment.apiUrl}/DowntimeGuide/${Id}`, downtime);
  }

  // Delete Downtime Guide
  public deleteDowntimeGuideId(Id: number): Observable<any[]>{
    return this.http.delete<DowntimeGuideList[]>(`${environment.apiUrl}/DowntimeGuide/${Id}`);
  }

  // Delete Multiple Downtime Guide Ids
  deleteMultipleIds(Ids: number[]): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/DowntimeGuide/delete-multiple`, { body: Ids });
  }

}
