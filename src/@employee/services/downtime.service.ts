import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { DowntimeGuide, DowntimeGuideId, DowntimeGuideList } from '@employee/models/downtime.model';


import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DowntimeGuideService {

  private url = "http://10.17.96.45:85/api/DowntimeGuide";

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
    return this.http.get<DowntimeGuideList[]>(`${this.url}?sortOrder=${sortOrder}`);
  }

  // Get Downtime Guide by ID
  public getDowntimeGuideId(Id: number): Observable<any[]>{
    return this.http.get<DowntimeGuideId[]>(`${this.url}/${Id}`);
  }

  // Create Downtime Guide
  public createDowntimeGuide(data: DowntimeGuide): Observable<DowntimeGuide[]>{
    return this.http.post<DowntimeGuide[]>(`${this.url}`, data);
  }

  // Edit Downtime Guide
  public editDowntimeGuide(data: DowntimeGuide): Observable<DowntimeGuide[]>{
    return this.http.put<DowntimeGuide[]>(`${this.url}`, data);
  }

  // Edit Downtime Guide by ID
  public editDowntimeGuideId(Id: number, downtime: DowntimeGuide): Observable<DowntimeGuide[]>{
    return this.http.put<DowntimeGuide[]>(`${this.url}/${Id}`, downtime);
  }

  // Delete Downtime Guide
  public deleteDowntimeGuideId(Id: number): Observable<any[]>{
    return this.http.delete<DowntimeGuideList[]>(`${this.url}/${Id}`);
  }

  // Delete Multiple Downtime Guide Ids
  deleteMultipleIds(Ids: number[]): Observable<any> {
    return this.http.delete<any>(`${this.url}/delete-multiple`, { body: Ids });
  }

}
