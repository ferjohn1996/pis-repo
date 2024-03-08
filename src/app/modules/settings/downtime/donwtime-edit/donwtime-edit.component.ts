import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { APIDowntimeGuideClassMappers } from '@employee/mappers/downtime-guide';
import { DowntimeGuideService } from '@employee/services/downtime.service';
import { DowntimeGuide1Service } from '@employee/services/downtime1.service';
import { fuseAnimations } from '@fuse/animations';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
    selector     : 'donwtime-edit',
    templateUrl  : './donwtime-edit.component.html',
    styleUrls    : ['./donwtime-edit.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class DowntimeGuideEditComponent implements OnInit, OnDestroy {

    postDataForm: FormGroup;

    datas: any;
    downtimeId: number;
    classification: string;
    description:    string;
    accountability: string;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor
    ( 
        public dialogRef: MatDialogRef<DowntimeGuideEditComponent>,
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
        const mapData = APIDowntimeGuideClassMappers(dataForm);
        this._downtimeService
            .editDowntimeGuideId(this.downtimeId, mapData)
            .subscribe(data => {
                Swal.fire({
                    title: "Success",
                    text: `Downtime guide update successfully.`,
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