import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { DowntimeGuide, DowntimeGuideId, DowntimeGuideList } from '@employee/models/downtime.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DowntimeGuideService {

  private url = "DowntimeGuide";

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
    return this.http.get<DowntimeGuideList[]>(`${environment.apiUrl}/${this.url}?sortOrder=${sortOrder}`);
  }

  // Get Downtime Guide by ID
  public getDowntimeGuideId(downtimeId: number): Observable<any[]>{
    return this.http.get<DowntimeGuideId[]>(`${environment.apiUrl}/${this.url}/${downtimeId}`);
  }

  // Create Downtime Guide
  public createDowntimeGuide(downtime: DowntimeGuide): Observable<DowntimeGuide[]>{
    return this.http.post<DowntimeGuide[]>(`${environment.apiUrl}/${this.url}`, downtime);
  }

  // Edit Downtime Guide
  public editDowntimeGuide(downtime: DowntimeGuide): Observable<DowntimeGuide[]>{
    return this.http.put<DowntimeGuide[]>(`${environment.apiUrl}/${this.url}`, downtime);
  }

  // Edit Downtime Guide by ID
  public editDowntimeGuideId(downtimeId: number, downtime: DowntimeGuide): Observable<DowntimeGuide[]>{
    return this.http.put<DowntimeGuide[]>(`${environment.apiUrl}/${this.url}/${downtimeId}`, downtime);
  }

  // Delete Downtime Guide
  public deleteDowntimeGuideId(productId: number): Observable<any[]>{
    return this.http.delete<DowntimeGuideList[]>(`${environment.apiUrl}/${this.url}/${productId}`);
  }

}
