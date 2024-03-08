import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { PlanningService } from '@employee/services/planning.service';
import { ComingSoonModalComponent } from '@employee/modals/coming-soon/coming-soon';
import Swal from 'sweetalert2';
import { PlanningList } from '@employee/models/planning.model';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { PlanningAddDiaglogComponent } from '../planning-add/planning-add.component';
import { Planning1Service } from '@employee/services/planning1.service';

@Component({
    selector     : 'planning',
    templateUrl  : './planning.component.html',
    styleUrls    : ['./planning.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlanningComponent implements OnInit, OnDestroy { 
    displayedColumns: string[] = [
        'id', 
        'planningBatchId', 
        'description', 
        'createdDateTime', 
        'actions'
    ];
    dataSource = new MatTableDataSource<any>();

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        public dialog: MatDialog,
        private _planningService: Planning1Service,
        private router: Router,
    )
    { }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._planningService.getPlanningList('desc')
            .subscribe((data) => {
                this.dataSource.data = data;
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
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

    applyFilter(value: string): void {
        value = value.trim().toLowerCase();
        this.dataSource.filter = value;
    }

    deleteRecordId(Id): void {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete this record?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                const id = Id;
                this._planningService.deletePlanningById(id)
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

    openAddDialog(): void {
        const dialogRef = this.dialog.open(PlanningAddDiaglogComponent, {
            panelClass: 'forms-dialog',
            width: '550px',
            data: {
                action: 'new',
                title: 'Planning Request',
            },
        });
    
        dialogRef.afterClosed()
            .subscribe((response) => {
                if (!response) {
                    return;
                }
            });
    }

    onComingSoon(): void {
        const dialogRef = this.dialog.open(ComingSoonModalComponent, {
            panelClass: 'settings-form-dialog',
            width: '350px',
            height: '350px',
            disableClose: false
        });

        dialogRef.afterClosed()
            .subscribe((response) => {
                if (!response) {
                    return;
                }
            });
    }

    onClickNewUpdate(id): void {
        this.router.navigate([`/user/request/details/${id}`]);
    }

}
