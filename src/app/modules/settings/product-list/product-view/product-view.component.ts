import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from '@employee/services/products.service';
import { Products1Service } from '@employee/services/products1.service';
import { fuseAnimations } from '@fuse/animations';
import { isDateView } from '@utils/date';
import { Subject } from 'rxjs';

@Component({
    selector     : 'product-view',
    templateUrl  : './product-view.component.html',
    styleUrls    : ['./product-view.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ProductViewComponent implements OnInit, OnDestroy {

    postDataForm: FormGroup;

    product: any;
    productId: number;
    productCode: string;
    productDescription: string;
    createdDateTime: string;
    modifiedDateTime: string;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor( 
        public dialogRef: MatDialogRef<ProductViewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,

        private fb: FormBuilder, 
        private _productService: Products1Service
    )
    {

        this.product = data.product;
        this.productId = this.product.id;

        this.postDataForm = this.fb.group({
            code: [''],
            description: [''],
        });
    }

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._productService.getProductClassificationId(this.productId)
            .subscribe(data => {
                this.product = data;
                this.productCode = this.product.code;
                this.productDescription = this.product.description;
                this.createdDateTime = isDateView(this.product.createdDateTime);
                this.modifiedDateTime = isDateView(this.product.modifiedDateTime);
            });  
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

    onCloseClick(): void {
        this.dialogRef.close();
    }

}