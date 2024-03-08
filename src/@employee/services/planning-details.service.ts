import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { environment } from "environments/environment";

@Injectable()
export class PlanningDetailsService implements Resolve<any> {
    routeParams: any;
    data: any;
    onDetailsChanged: BehaviorSubject<any>;

    private url = "http://10.17.96.45:85/api/PlanningRequest";
    // private url: "https://localhost:7040/api/PlanningRequest";

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
                    .get(`${this.url}/${this.routeParams.id}`)
                    .subscribe((response: any) => {
                        this.data = response;
                        this.onDetailsChanged.next(this.data);
                        resolve(response);
                    }, reject);
            }
        });
    }

    // Delete Planning Line 1 by ID
    public deleteLine1ById(id: number): Observable<any[]>{
        return this._httpClient.delete<any[]>(`${this.url}/line1/${id}`);
    }
}
