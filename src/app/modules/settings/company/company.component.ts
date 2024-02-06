import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductClassification } from '@employee/models/product.model';
import { ProductsService } from '@employee/services/products.service';
import { result } from 'lodash';
import { Subject } from 'rxjs';

@Component({
    selector     : 'company',
    templateUrl  : './company.component.html',
    styleUrls    : ['./company.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CompanyListComponent implements OnInit, OnDestroy
{ 
    products: ProductClassification[] = [];

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor( private productClassification: ProductsService )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.productClassification
            .getProductClassification()
            .subscribe((result: ProductClassification []) => (this.products = result));
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}
