import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { environment } from "environments/environment";

@Injectable()
export class PlanningDetails1Service implements Resolve<any> {
    routeParams: any;
    data: any;
    onDetailsChanged: BehaviorSubject<any>;

    private url: "https://localhost:7040/api";

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private _httpClient: HttpClient) {
        // Set the defaults
        this.onDetailsChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        this.routeParams = route.params;
        return new Promise((resolve, reject) => {
            Promise.all([this.populate()]).then(() => {
                resolve(1);
            }, reject);
        });
    }

    populate(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onDetailsChanged.next(false);
                resolve(false);
            } else {
                this._httpClient
                    .get(`https://localhost:7040/api/PlanningRequest/${this.routeParams.id}`)
                    .subscribe((response: any) => {
                        this.data = response;
                        this.onDetailsChanged.next(this.data);
                        resolve(response);
                    }, reject);
            }
        });
    }


    // Delete Planning Line 1 by ID
    deleteLine1ById(id: number): Observable<any[]>{
        return this._httpClient.delete<any[]>(`https://localhost:7040/api/PlanningRequest/line1/${id}`);
    }

    // Delete Planning Line 2 by ID
    deleteLine2ById(id: number): Observable<any[]>{
        return this._httpClient.delete<any[]>(`https://localhost:7040/api/PlanningRequest/line2/${id}`);
    }

    // Delete Planning Line 3 by ID
    deleteLine3ById(id: number): Observable<any[]>{
        return this._httpClient.delete<any[]>(`https://localhost:7040/api/PlanningRequest/line3/${id}`);
    }
}
