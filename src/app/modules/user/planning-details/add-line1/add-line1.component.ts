import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { APIPlanningLine1Mappers, APIPlanningMappers } from '@employee/mappers/planning';
import { DowntimeGuideList } from '@employee/models/downtime.model';
import { PlanningList } from '@employee/models/planning.model';
import { ProductClassificationId, ProductClassificationList } from '@employee/models/product.model';
import { DowntimeGuideService } from '@employee/services/downtime.service';
import { PlanningService } from '@employee/services/planning.service';
import { ProductsService } from '@employee/services/products.service';
import { fuseAnimations } from '@fuse/animations';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
    selector     : 'add-line1',
    templateUrl  : './add-line1.component.html',
    styleUrls    : ['./add-line1.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class PlanningAddLine1Component implements OnInit, OnDestroy {

    postDataForm: FormGroup;
    validationErrors: string[] = [];

    productModel: ProductClassificationList;
    productById: ProductClassificationId;
    productId: number;
    description: string;

    planningId: number;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor( 
        public dialogRef: MatDialogRef<PlanningAddLine1Component>,
        @Inject(MAT_DIALOG_DATA) public data: any,

        private fb: FormBuilder, 
        private _planningService: PlanningService
    )
    {
        this._planningService.getProductForOptions()
            .then(data => {
                this.productModel = data;
        });

        this.postDataForm = this.fb.group({
            planningId: [''],
            planningRequestId: [''],
            sku: [''],
            description: [''],
            form: [''],
            mt: [''],
            actualHours: [''],
            effectiveCapacity: [''],
            dieSizeThickness: [''],
            changeOver: [''],
            uncontrollable: [''],
            accountability: [''],
            delayStatus: [''],
            timeProduce: [''],
            remarks: ['']
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

    onProductSelectionChange(productId: number): void {
        this._planningService.getProducIdOptions(productId)
            .then(data => {
                this.description = data.description;
            });
    }

    onSubmit(): void {
        const dataForm = this.postDataForm.getRawValue();
        const mapData = APIPlanningLine1Mappers(dataForm);
        
        this._planningService
            .createPlanningLine1(mapData)
            .subscribe(
                (response: any) => {
                    Swal.fire({
                        title: "Success",
                        text: `Added sucessfully`,
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
                },
                (error) => {
                    console.error("Error occurred while creating planning:", error);
                }
            );
    }

    onCloseClick(): void {
        this.dialogRef.close();
    }

}