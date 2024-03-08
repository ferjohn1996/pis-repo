import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { APIDowntimeGuideClassMappers } from '@employee/mappers/downtime-guide';
import { DowntimeGuideService } from '@employee/services/downtime.service';
import { DowntimeGuide1Service } from '@employee/services/downtime1.service';
import { fuseAnimations } from '@fuse/animations';
import { isDateView } from '@utils/date';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
    selector     : 'donwtime-view',
    templateUrl  : './donwtime-view.component.html',
    styleUrls    : ['./donwtime-view.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class DowntimeGuideViewComponent implements OnInit, OnDestroy {

    postDataForm: FormGroup;

    datas: any;
    downtimeId: number;
    classification: string;
    description:    string;
    accountability: string;
    createdDateTime: string;
    modifiedDateTime: string;

    isDisabled: boolean = true;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor
    ( 
        public dialogRef: MatDialogRef<DowntimeGuideViewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        
        private fb: FormBuilder, 
        private _downtimeService: DowntimeGuide1Service
    )
    {
        this.datas = data.downtime;
        this.downtimeId = this.datas.id;

        this.postDataForm = this.fb.group({
            classification: [''],
            description: [''],
            accountability: ['']
        });
    }

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._downtimeService.getDowntimeGuideId(this.downtimeId)
            .subscribe(data => {
                this.datas = data;
                this.classification = this.datas.classification;
                this.description = this.datas.description;
                this.accountability = this.datas.accountability;
                this.createdDateTime = isDateView(this.datas.createdDateTime);
                this.modifiedDateTime = isDateView(this.datas.modifiedDateTime);
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