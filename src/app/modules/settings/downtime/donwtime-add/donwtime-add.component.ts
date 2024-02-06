import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { APIDowntimeGuideClassMappers } from '@employee/mappers/downtime-guide';
import { DowntimeGuideService } from '@employee/services/downtime.service';
import { fuseAnimations } from '@fuse/animations';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
    selector     : 'donwtime-add',
    templateUrl  : './donwtime-add.component.html',
    styleUrls    : ['./donwtime-add.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class DowntimeGuideRequestComponent implements OnInit, OnDestroy {

    postDataForm: FormGroup;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor
    ( 
        public dialogRef: MatDialogRef<DowntimeGuideRequestComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        
        private fb: FormBuilder, 
        private _downtimeService: DowntimeGuideService
    )
    {
        this.postDataForm = this.fb.group({
            classification: ['', Validators.required],
            description: ['', Validators.required],
            accountability: ['', Validators.required]
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
        const mapData = APIDowntimeGuideClassMappers(dataForm);
        this._downtimeService
            .createDowntimeGuide(mapData)
            .subscribe(data => {
                Swal.fire({
                    title: "Success",
                    text: `Downtime guide added successfully.`,
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