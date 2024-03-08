import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductClassificationList } from '@employee/models/product.model';
import { Planning1Service } from '@employee/services/planning1.service';
import { fuseAnimations } from '@fuse/animations';
import { Subject } from 'rxjs';

@Component({
    selector     : 'line1-view',
    templateUrl  : './line1-view.component.html',
    styleUrls    : ['./line1-view.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class PlanningViewLine1Component implements OnInit, OnDestroy {

    postDataForm: FormGroup;
    validationErrors: string[] = [];

    planningLine: any;
    lineId: number;
    linePlanningId:           number;
    lineSku:                  string;
    lineSkuCode:              string;
    lineDescription:          string;
    lineForm:                 string;
    lineMt:                   number;
    lineActualHours:          number;
    lineEffectiveCapacity:    number;
    lineDieSizeThickness:     number;
    lineChangeOver:           number;
    lineUncontrollable:       number;
    lineAccountability:       string;
    lineDelayStatus:          string;
    lineTimeProduce:          number;
    lineRemarks:              string;
    lineCreatedDateTime:      string;
    lineModifiedDateTime:      string;


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
        public dialogRef: MatDialogRef<PlanningViewLine1Component>,
        @Inject(MAT_DIALOG_DATA) public data: any,

        private fb: FormBuilder, 
        private _planningService: Planning1Service
    )
    {
        this.planningLine = data.planning;
        this.lineId = this.planningLine.id;

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
        this._planningService.getPlanningLine1ById(this.lineId)
            .then(data => {
                this.planningLine = data;
                this.lineId = data.id;
                this.linePlanningId = data.planningId;
                this.lineSku = data.sku;
                this.lineSkuCode = data.skuCode;
                this.lineDescription = data.description;
                this.lineForm = data.form;
                this.lineMt = data.mt;
                this.lineActualHours = data.actualHours;
                this.lineEffectiveCapacity = data.effectiveCapacity;
                this.lineDieSizeThickness = data.dieSizeThickness;
                this.lineChangeOver = data.changeOver;
                this.lineUncontrollable = data.uncontrollable;
                this.lineAccountability = data.accountability;
                this.lineDelayStatus = data.delayStatus;
                this.lineTimeProduce = data.timeProduce;
                this.lineRemarks = data.remarks;
                this.lineCreatedDateTime = data.createdDateTime;
                this.lineModifiedDateTime = data.lastModifiedDateTime;
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