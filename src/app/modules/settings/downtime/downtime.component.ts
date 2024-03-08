import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DowntimeGuideRequestComponent } from './donwtime-add/donwtime-add.component';
import { DowntimeGuideService } from '@employee/services/downtime.service';
import { DowntimeGuideEditComponent } from './donwtime-edit/donwtime-edit.component';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import Swal from 'sweetalert2';
import { ComingSoonModalComponent } from '@employee/modals/coming-soon/coming-soon';
import { DowntimeGuideList } from '@employee/models/downtime.model';
import { DowntimeGuideViewComponent } from './donwtime-view/donwtime-view.component';
import { DowntimeGuide1Service } from '@employee/services/downtime1.service';

@Component({
    selector     : 'downtime',
    templateUrl  : './downtime.component.html',
    styleUrls    : ['./downtime.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DowntimeGuideListComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = [
        'checkbox',
        'id', 
        'classification', 
        'description',
        'accountability',
        'createdDateTime',
        'actions'
    ];
    dataSource = new MatTableDataSource<any>();
    selectedIds: number[] = [];


    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    action: string;
    title: string;

    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor
    ( 
        public dialog: MatDialog,
        private _downtimeService: DowntimeGuide1Service
    )
    { }

    toggleSelection(element: DowntimeGuideList) {
        element.isSelected = !element.isSelected;
    
        if (element.isSelected && !this.selectedIds.includes(element.id)) {
            this.selectedIds.push(element.id);
        } else if (!element.isSelected && this.selectedIds.includes(element.id)) {
            this.selectedIds = this.selectedIds.filter(id => id !== element.id);
        }
    }

    /**
     * On init
     */
    ngOnInit(): void
    {
        // this._downtimeService.getDowntimeGuideList()
        //     .subscribe((data) => {
        //         this.dataSource.data = data;
        //         this.dataSource.paginator = this.paginator;
        //         this.dataSource.sort = this.sort;
        //     });

        this._downtimeService.getDowntimeGuideList('desc')
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

    openAddDialog(): void {
        const dialogRef = this.dialog.open(DowntimeGuideRequestComponent, {
            panelClass: 'forms-dialog',
            width: '550px',
            data: {
                action: 'new',
                title: 'Downtime Guide',
            },
        });
    
        dialogRef.afterClosed().subscribe(result => {
        //   console.log('The dialog was closed');
          this.title = result;
        });
    }

    openEditDialog(downtime): void {
        const dialogRef = this.dialog.open(DowntimeGuideEditComponent, {
            panelClass: 'forms-dialog',
            width: '550px',
            data: {
                action: 'new',
                title: 'Downtime Guide',
                downtime: downtime
            },
        });
    
        dialogRef.afterClosed().subscribe(result => {
        //   console.log('The dialog was closed');
          this.title = result;
        });
    }

    openViewDialog(downtime): void {
        const dialogRef = this.dialog.open(DowntimeGuideViewComponent, {
            panelClass: 'forms-dialog',
            width: '550px',
            data: {
                action: 'new',
                title: 'Product Request',
                downtime: downtime
            },
        });
    
        dialogRef.afterClosed().subscribe(result => {
        //   console.log('The dialog was closed');
          this.title = result;
        });
    }

    deleteRecordId(downtimeId): void {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete this record?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                const id = downtimeId;
                this._downtimeService.deleteDowntimeGuideId(id)
                    .subscribe((response) => {
                        Swal.fire({
                            title: "Success",
                            text: `Deleted successfully.`,
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

    deleteMultipleRecords() {
        if (this.selectedIds.length === 0) {
            // Show an error message or alert indicating no records are selected.
            Swal.fire({
                title: "Error",
                text: "No records are selected",
                icon: "error",
                showConfirmButton: true,
                confirmButtonColor: '#2196F3',
                allowOutsideClick: false
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
            return;
        }

        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete this multiple records?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._downtimeService.deleteMultipleIds(this.selectedIds)
                    .subscribe(() => {
                        // Handle success, e.g., refresh data or show a success message.
                        Swal.fire({
                            title: "Success",
                            text: `Records deleted successfully.`,
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
        });
    }

    onComingSoon(): void {
        const dialogRef = this.dialog.open(ComingSoonModalComponent, {
            panelClass: 'settings-form-dialog',
            width: '400px',
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
}