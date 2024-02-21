import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { APIPlanningMappers } from '@employee/mappers/planning';
import { PlanningService } from '@employee/services/planning.service';
import { fuseAnimations } from '@fuse/animations';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
    selector     : 'planning-add',
    templateUrl  : './planning-add.component.html',
    styleUrls    : ['./planning-add.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class PlanningAddDiaglogComponent implements OnInit, OnDestroy {

    postDataForm: FormGroup;
    validationErrors: string[] = [];

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor( 
        public dialogRef: MatDialogRef<PlanningAddDiaglogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,

        private fb: FormBuilder, 
        private _planningService: PlanningService,
        private router: Router
    )
    {
        this.postDataForm = this.fb.group({
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
        const mapData = APIPlanningMappers(dataForm);
        
        this._planningService
            .createPlanning(mapData)
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
                            this.router.navigateByUrl(`/user/request/details/${response.id}`);
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