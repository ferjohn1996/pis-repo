import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PlanningDetailsService } from '@employee/services/planning-details.service';
import { takeUntil } from 'rxjs/operators';
import { Line, PlanningById } from '@employee/models/planning.model';
import { Router } from '@angular/router';
import { PlanningAddLine1Component } from './add-line1/add-line1.component';

@Component({
    selector     : 'planning-details',
    templateUrl  : './planning-details.html',
    styleUrls    : ['./planning-details.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlanningDetailsComponent implements OnInit, OnDestroy { 
    
    planning: PlanningById;
    planningBatchId: string;
    planningLine1: Line;
    planningLine2: Line;
    planningLine3: Line;
    lineTable1: Line[] = [];
    lineTable2: Line[] = [];
    lineTable3: Line[] = [];

    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     */
    constructor(
        public dialog: MatDialog,
        private _planningDetailsService: PlanningDetailsService,
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

                this.planningLine1 = data.line1;
                this.planningLine2 = data.line2;
                this.planningLine3 = data.line3;

                this.lineTable1 = data.line1;
                this.lineTable2 = data.line2;
                this.lineTable3 = data.line3;
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
            },
        });
    
        dialogRef.afterClosed()
            .subscribe((response) => {
                if (!response) {
                    return;
                }
            });
    }
}
