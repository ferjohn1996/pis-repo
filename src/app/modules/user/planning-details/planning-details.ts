import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PlanningDetailsService } from '@employee/services/planning-details.service';
import { takeUntil } from 'rxjs/operators';
import { Line, PlanningById } from '@employee/models/planning.model';
import { Router } from '@angular/router';
import { PlanningDetails1Service } from '@employee/services/planning-details1.service';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import Swal from 'sweetalert2';
import { PlanningAddLine1Component } from './line1-add/line1-add.component';
import { PlanningEditLine1Component } from './line1-edit/line1-edit.component';
import { PlanningViewLine1Component } from './line1-view/line1-view.component';
import { PlanningAddLine2Component } from './line2-add/line2-add.component';
import { PlanningEditLine2Component } from './line2-edit/line2-edit.component';
import { PlanningViewLine2Component } from './line2-view/line2-view.component';
import { PlanningAddLine3Component } from './line3-add/line3-add.component';
import { PlanningEditLine3Component } from './line3-edit/line3-edit.component';
import { PlanningViewLine3Component } from './line3-view/line3-view.component';

@Component({
    selector     : 'planning-details',
    templateUrl  : './planning-details.html',
    styleUrls    : ['./planning-details.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlanningDetailsComponent implements OnInit, OnDestroy { 
    
    planning: PlanningById;
    planningId: number;
    planningBatchId: string;
    createdDateTime: string;
    modifiedDateTime: string;
    planningLine1: Line;
    planningLine2: Line;
    planningLine3: Line;
    lineTable1: Line[] = [];
    lineTable2: Line[] = [];
    lineTable3: Line[] = [];

    statusId:             number;
    line1TotalMT:         number;
    line2TotalMT:         number;
    line3TotalMT:         number;
    line1TotalTP:         number;
    line2TotalTP:         number;
    line3TotalTP:         number;
    totalVolume:          number;
    totalActual:          number;

    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     */
    constructor(
        public dialog: MatDialog,
        private _planningDetailsService: PlanningDetails1Service,
        private router: Router,
    )
    {
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._planningDetailsService.populate()
            .then(data => {
                this.planning = data;
                this.planningBatchId = data.planningBatchId;
                this.planningId = data.id;
                this.createdDateTime = data.createdDateTime;
                this.modifiedDateTime = data.lastModifiedDateTime;

                this.planningLine1 = data.line1;
                this.planningLine2 = data.line2;
                this.planningLine3 = data.line3;

                this.lineTable1 = data.line1;
                this.lineTable2 = data.line2;
                this.lineTable3 = data.line3;

                this.statusId = data.statusId;

                this.line1TotalMT = data.line1TotalMT;
                this.line2TotalMT = data.line2TotalMT;
                this.line3TotalMT = data.line3TotalMT

                this.line1TotalTP = data.line1TotalTP;
                this.line2TotalTP = data.line2TotalTP;
                this.line3TotalTP = data.line3TotalTP;

                this.totalVolume = data.totalVolume;
                this.totalActual = data.totalActual;
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

    onClickBack(): void {
        this.router.navigate(["/user/request/plannning"]);
    }

    openAddLine1Dialog(): void {
        const dialogRef = this.dialog.open(PlanningAddLine1Component, {
            panelClass: 'forms-dialog',
            width: '800px',
            data: {
                action: 'new',
                title: 'Line 1 Request',
                id: this.planningId
            },
        });
    
        dialogRef.afterClosed()
            .subscribe((response) => {
                if (!response) {
                    return;
                }
            });
    }

    openAddLine2Dialog(): void {
        const dialogRef = this.dialog.open(PlanningAddLine2Component, {
            panelClass: 'forms-dialog',
            width: '800px',
            data: {
                action: 'new',
                title: 'Line 2 Request',
                id: this.planningId
            },
        });
    
        dialogRef.afterClosed()
            .subscribe((response) => {
                if (!response) {
                    return;
                }
            });
    }

    openAddLine3Dialog(): void {
        const dialogRef = this.dialog.open(PlanningAddLine3Component, {
            panelClass: 'forms-dialog',
            width: '800px',
            data: {
                action: 'new',
                title: 'Line 3 Request',
                id: this.planningId
            },
        });
    
        dialogRef.afterClosed()
            .subscribe((response) => {
                if (!response) {
                    return;
                }
            });
    }

    openEditLine1Dialog(planning): void {
        const dialogRef = this.dialog.open(PlanningEditLine1Component, {
            panelClass: 'forms-dialog',
            width: '800px',
            data: {
                action: 'new',
                title: 'Product Request',
                planning: planning
            },
        });
    
        dialogRef.afterClosed()
            .subscribe((response) => {
                if (!response) {
                    return;
                }
            });
    }

    openEditLine2Dialog(planning): void {
        const dialogRef = this.dialog.open(PlanningEditLine2Component, {
            panelClass: 'forms-dialog',
            width: '800px',
            data: {
                action: 'new',
                title: 'Product Request',
                planning: planning
            },
        });
    
        dialogRef.afterClosed()
            .subscribe((response) => {
                if (!response) {
                    return;
                }
            });
    }

    openEditLine3Dialog(planning): void {
        const dialogRef = this.dialog.open(PlanningEditLine3Component, {
            panelClass: 'forms-dialog',
            width: '800px',
            data: {
                action: 'new',
                title: 'Product Request',
                planning: planning
            },
        });
    
        dialogRef.afterClosed()
            .subscribe((response) => {
                if (!response) {
                    return;
                }
            });
    }

    openViewLine1Dialog(planning): void {
        const dialogRef = this.dialog.open(PlanningViewLine1Component, {
            panelClass: 'forms-dialog',
            width: '800px',
            data: {
                action: 'new',
                title: 'Product Request',
                planning: planning
            },
        });
    
        dialogRef.afterClosed()
            .subscribe((response) => {
                if (!response) {
                    return;
                }
            });
    }

    openViewLine2Dialog(planning): void {
        const dialogRef = this.dialog.open(PlanningViewLine2Component, {
            panelClass: 'forms-dialog',
            width: '800px',
            data: {
                action: 'new',
                title: 'Product Request',
                planning: planning
            },
        });
    
        dialogRef.afterClosed()
            .subscribe((response) => {
                if (!response) {
                    return;
                }
            });
    }

    openViewLine3Dialog(planning): void {
        const dialogRef = this.dialog.open(PlanningViewLine3Component, {
            panelClass: 'forms-dialog',
            width: '800px',
            data: {
                action: 'new',
                title: 'Product Request',
                planning: planning
            },
        });
    
        dialogRef.afterClosed()
            .subscribe((response) => {
                if (!response) {
                    return;
                }
            });
    }

    deleteLine1RecordId(productId): void {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Delete this record?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                const id = productId;
                this._planningDetailsService.deleteLine1ById(id)
                    .subscribe((response) => {
                        Swal.fire({
                            title: "Success",
                            text: `Record deleted successfully.`,
                            icon: "success",
                            showConfirmButton: true,
                            confirmButtonColor: '#4CAF50',
                            allowOutsideClick: false
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload();
                            }
                        });
                    });
            }
            this.confirmDialogRef = null;
        });
    }

    deleteLine2RecordId(productId): void {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Delete this record?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                const id = productId;
                this._planningDetailsService.deleteLine2ById(id)
                    .subscribe((response) => {
                        Swal.fire({
                            title: "Success",
                            text: `Record deleted successfully.`,
                            icon: "success",
                            showConfirmButton: true,
                            confirmButtonColor: '#4CAF50',
                            allowOutsideClick: false
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload();
                            }
                        });
                    });
            }
            this.confirmDialogRef = null;
        });
    }

    deleteLine3RecordId(productId): void {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Delete this record?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                const id = productId;
                this._planningDetailsService.deleteLine3ById(id)
                    .subscribe((response) => {
                        Swal.fire({
                            title: "Success",
                            text: `Record deleted successfully.`,
                            icon: "success",
                            showConfirmButton: true,
                            confirmButtonColor: '#4CAF50',
                            allowOutsideClick: false
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload();
                            }
                        });
                    });
            }
            this.confirmDialogRef = null;
        });
    }
}
