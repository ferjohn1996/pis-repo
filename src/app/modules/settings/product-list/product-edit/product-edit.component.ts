import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { APIProductClassMappers } from '@employee/mappers/product-classification';
import { ProductsService } from '@employee/services/products.service';
import { fuseAnimations } from '@fuse/animations';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
    selector     : 'product-edit',
    templateUrl  : './product-edit.component.html',
    styleUrls    : ['./product-edit.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ProductUpdateComponent implements OnInit, OnDestroy {

    postDataForm: FormGroup;

    product: any;
    productId: number;
    productCode: string;
    productDescription: string;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor( 
        public dialogRef: MatDialogRef<ProductUpdateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,

        private fb: FormBuilder, 
        private _productService: ProductsService
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

    onSubmit(): void {
        const dataForm = this.postDataForm.getRawValue();
        const mapData = APIProductClassMappers(dataForm);
        this._productService
            .editProductClassificationId(this.productId, mapData)
            .subscribe(data => {
                Swal.fire({
                    title: "Success",
                    text: `Product update successfully.`,
                    icon: "success",
                    showConfirmButton: true,
                    confirmButtonColor: '#4CAF50',
                    allowOutsideClick: false
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload();
                        }
                    });
                    setTimeout(() => {
                        this.dialogRef.close(['save']);
                    }, 500);
            },
            error => {
                alert(error);
            });
    }

    onCloseClick(): void {
        this.dialogRef.close();
    }

}