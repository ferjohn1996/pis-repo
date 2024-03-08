import { Component, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { APIProductClassMappers } from '@employee/mappers/product-classification';
import { ProductsService } from '@employee/services/products.service';
import { Products1Service } from '@employee/services/products1.service';
import { fuseAnimations } from '@fuse/animations';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
    selector     : 'product-add',
    templateUrl  : './product-add.component.html',
    styleUrls    : ['./product-add.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ProductRequestComponent implements OnInit, OnDestroy {

    postDataForm: FormGroup;
    validationErrors: string[] = [];

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor( 
        public dialogRef: MatDialogRef<ProductRequestComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,

        private fb: FormBuilder, 
        private _productService: Products1Service
    )
    {
        this.postDataForm = this.fb.group({
            code: ['', Validators.required],
            description: ['', Validators.required],
        });
    }

    /**
     * On init
     */
    ngOnInit(): void
    {
        
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
            .createProductClassification(mapData)
            .subscribe(
                (response: any) => {
                    // console.log('Response:', response);
    
                    // Check the success property to determine the status
                    if (response.success) {
                        let message = response.message;
                        let success = response.success;
                        // console.log(success, message);

                        Swal.fire({
                            title: "Success",
                            text: `${message}`,
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
                        }, 500)

                    } else {
                        // Handle the error case
                        let errorMessage = response.message; // Assuming there is a message property in error response
                        console.log(false, errorMessage);
                    }
                },
                (error: any) => {
                    // Handle HTTP error (status code other than 2xx)
                    console.error('HTTP error:', error);
    
                    // Check if the error has a response body
                    if (error.error) {
                        let errorMessage = error.error.message; // Adjust based on your actual error response structure
                        // console.log(false, errorMessage);

                        Swal.fire({
                            title: "Error",
                            text: `${errorMessage}`,
                            icon: "error",
                            showConfirmButton: true,
                            confirmButtonColor: '#2196F3',
                            allowOutsideClick: false
                        });
                        setTimeout(() => {
                            this.dialogRef.close(['save']);
                        }, 500)
                    } else {
                        console.log(false, 'Unknown error occurred.');
                    }
                }
            );
    }

    onCloseClick(): void {
        this.dialogRef.close();
    }

}