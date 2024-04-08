import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { DowntimeGuide, DowntimeGuideId, DowntimeGuideList } from '@employee/models/downtime.model';
import { environment } from 'environments/environment';


import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DowntimeGuide1Service {

  private url: "https://localhost:7040/api";

  // Declare an event emitter
  productUpdated = new EventEmitter<void>();

  constructor ( private http: HttpClient ) 
  {
   
  }

  getDowntimeGuideList(sortOrder: string = 'asc'): Observable<any> {
    return this.http.get<any>(
      `https://localhost:7040/api/DowntimeGuide?sortOrder=${sortOrder}`
    );
  }

  // Get Downtime Guide by ID
  getDowntimeGuideId(Id: number): Observable<any[]>{
    return this.http.get<DowntimeGuideId[]>(`https://localhost:7040/api/DowntimeGuide/${Id}`);
  }

  // Create Downtime Guide
  createDowntimeGuide(data: DowntimeGuide): Observable<DowntimeGuide[]>{
    return this.http.post<DowntimeGuide[]>(`https://localhost:7040/api/DowntimeGuide`, data);
  }

  // Edit Downtime Guide
  editDowntimeGuide(data: DowntimeGuide): Observable<DowntimeGuide[]>{
    return this.http.put<DowntimeGuide[]>(`https://localhost:7040/api/DowntimeGuide`, data);
  }

  // Edit Downtime Guide by ID
  editDowntimeGuideId(Id: number, downtime: DowntimeGuide): Observable<DowntimeGuide[]>{
    return this.http.put<DowntimeGuide[]>(`https://localhost:7040/api/DowntimeGuide`, downtime);
  }

  // Delete Downtime Guide
  deleteDowntimeGuideId(Id: number): Observable<any[]>{
    return this.http.delete<DowntimeGuideList[]>(`https://localhost:7040/api/DowntimeGuide/${Id}`);
  }

  // Delete Multiple Downtime Guide Ids
  deleteMultipleIds(Ids: number[]): Observable<any> {
    return this.http.delete<any>(`https://localhost:7040/api/DowntimeGuide/delete-multiple`, { body: Ids });
  }

}
