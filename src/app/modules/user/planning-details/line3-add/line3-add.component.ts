import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { APIPlanningLineMappers } from '@employee/mappers/planning';
import { PlanningById } from '@employee/models/planning.model';
import { ProductClassificationId, ProductClassificationList } from '@employee/models/product.model';
import { Planning1Service } from '@employee/services/planning1.service';
import { fuseAnimations } from '@fuse/animations';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
    selector     : 'line3-add',
    templateUrl  : './line3-add.component.html',
    styleUrls    : ['./line3-add.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class PlanningAddLine3Component implements OnInit, OnDestroy {

    postDataForm: FormGroup;
    validationErrors: string[] = [];

    productModel: ProductClassificationList;
    productById: ProductClassificationId;
    productId: number;
    description: string;
    skuCode: string;

    planningId: number;

    planning: PlanningById;
    planningById: number;

    showHide: boolean = false;

    // For filtering department name
    public productionOptions: ProductClassificationList[] = [];
    public productList = this.productionOptions.slice();

    // For sorting name or description
    sortedArray = [];

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor( 
        public dialogRef: MatDialogRef<PlanningAddLine3Component>,
        @Inject(MAT_DIALOG_DATA) public data: any,

        private fb: FormBuilder, 
        private _planningService: Planning1Service
    )
    {
        // this._planningService.getProductForOptions()
        //     .then(data => {
        //         this.productModel = data;
        // });

        this._planningService.getProductForOptions().then((response = []) => {
            this.productModel = response;
            this.productionOptions = response;
            this.productList = this.productionOptions.slice();

            // Sort SKU
            this.sortedArray = this.productList.sort((a,b) => {
                if(a.code < b.code) { return -1; }
                if(a.code > b.code) { return 1; }
            });
        });

        this._planningService.getPlanningById(data.id)
            .then(data => {
                this.planning = data;
                this.planningById = data.id;
            });

        this.postDataForm = this.fb.group({
            planningId: [''],
            sku: [''],
            skuCode: [''],
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
                this.skuCode = data.code;
            });
    }

    onSubmit(): void {
        const dataForm = this.postDataForm.getRawValue();
        const mapData = APIPlanningLineMappers(dataForm);
        
        this._planningService
            .createPlanningLine3(mapData)
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