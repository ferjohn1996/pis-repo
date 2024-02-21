import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { APIProductClassMappers } from '@employee/mappers/product-classification';
import { ProductsService } from '@employee/services/products.service';
import { fuseAnimations } from '@fuse/animations';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
    selector     : 'product-upload',
    templateUrl  : './product-upload.component.html',
    styleUrls    : ['./product-upload.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ProductUploadComponent implements OnInit, OnDestroy {

    selectedFile: File | null = null;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor( 
        public dialogRef: MatDialogRef<ProductUploadComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,

        private _productService: ProductsService,
        private http: HttpClient
    )
    { }

    onFileSelected(event: any): void {
        this.selectedFile = event.target.files[0];
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
        
        if (!this.selectedFile) {
            Swal.fire({
                title: "Error",
                text: "No file selected",
                icon: "error",
                showConfirmButton: true,
                confirmButtonColor: '#2196F3',
                allowOutsideClick: false
            });
            setTimeout(() => {
                this.dialogRef.close(['save']);
            }, 500)
            return;
        }
    
        const formData = new FormData();
        formData.append('file', this.selectedFile);

        this._productService.uploadFiles(formData)
            .subscribe(response => {
                if (response.success) {
                    let message = response.message;
                    let success = response.success;

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
            });
    }

    onCloseClick(): void {
        this.dialogRef.close();
    }

}