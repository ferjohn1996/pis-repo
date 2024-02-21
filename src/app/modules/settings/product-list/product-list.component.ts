import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ProductRequestComponent } from './product-add/product-add.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductsService } from '@employee/services/products.service';
import { ProductUpdateComponent } from './product-edit/product-edit.component';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import Swal from 'sweetalert2';
import { ComingSoonModalComponent } from '@employee/modals/coming-soon/coming-soon';
import { ProductClassificationList } from '@employee/models/product.model';
import { ProductUploadComponent } from './product-upload/product-upload.component';
import { ProductViewComponent } from './product-view/product-view.component';

@Component({
    selector     : 'product-list',
    templateUrl  : './product-list.component.html',
    styleUrls    : ['./product-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProductListComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = [
        'checkbox',
        'id', 
        'code', 
        'description', 
        'createdDateTime', 
        'actions'
    ];
    dataSource = new MatTableDataSource<any>();
    selectedIds: number[] = [];

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    isLoadingResults: boolean = true;

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
        private _productService: ProductsService
    )
    { }

    toggleSelectAll() {
        const allSelected = this.isAllSelected();
    
        // Update isSelected property for each element in the dataSource.data array
        this.dataSource.data.forEach(element => {
            if (!allSelected) {
                element.isSelected = true; // Select all on the current page
                const index = this.selectedIds.indexOf(element.id);
                if (index === -1) {
                    this.selectedIds.push(element.id); // Add to selectedIds if selected
                }
            } else {
                element.isSelected = false; // Deselect all on the current page
                const index = this.selectedIds.indexOf(element.id);
                if (index !== -1) {
                    this.selectedIds.splice(index, 1); // Remove from selectedIds if deselected
                }
            }
        });
    }
    

    // Method to check if all rows are selected
    isAllSelected() {
        return this.dataSource.data.length > 0 && this.selectedIds.length === this.dataSource.data.length;
    }

    toggleSelection(element: ProductClassificationList) {
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
        // Get Product Classification List
        // this._productService.getProductClassification()
        //     .subscribe((data) => {
        //         this.dataSource.data = data;
        //         this.dataSource.paginator = this.paginator;
        //         this.dataSource.sort = this.sort;
        //     });

        this._productService.getProductClassification('desc')
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
        const dialogRef = this.dialog.open(ProductRequestComponent, {
            panelClass: 'forms-dialog',
            width: '550px',
            data: {
                action: 'new',
                title: 'Product Request',
            },
        });
    
        dialogRef.afterClosed().subscribe(result => {
        //   console.log('The dialog was closed');
          this.title = result;
        });
    }

    openEditDialog(product): void {
        const dialogRef = this.dialog.open(ProductUpdateComponent, {
            panelClass: 'forms-dialog',
            width: '550px',
            data: {
                action: 'new',
                title: 'Product Request',
                product: product
            },
        });
    
        dialogRef.afterClosed().subscribe(result => {
        //   console.log('The dialog was closed');
          this.title = result;
        });
    }

    openViewDialog(product): void {
        const dialogRef = this.dialog.open(ProductViewComponent, {
            panelClass: 'forms-dialog',
            width: '550px',
            data: {
                action: 'new',
                title: 'Product Request',
                product: product
            },
        });
    
        dialogRef.afterClosed().subscribe(result => {
        //   console.log('The dialog was closed');
          this.title = result;
        });
    }

    openUploadDialog(): void {
        const dialogRef = this.dialog.open(ProductUploadComponent, {
            panelClass: 'forms-dialog',
            width: '400px',
            data: {
                action: 'new',
                title: 'Product Request',
            },
        });
    
        dialogRef.afterClosed().subscribe(result => {
        //   console.log('The dialog was closed');
          this.title = result;
        });
    }

    deleteRecordId(productId): void {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete this product?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                const id = productId;
                this._productService.deleteProductClassification(id)
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

    deleteMultipleRecords() {
        // Filter selectedIds to include only the ids of selected records on the current page
        const selectedIdsOnCurrentPage = this.dataSource.filteredData
            .filter((element, index) => element.isSelected && index >= this.paginator.pageIndex * this.paginator.pageSize && index < (this.paginator.pageIndex + 1) * this.paginator.pageSize)
            .map(element => element.id);    

        if (selectedIdsOnCurrentPage.length === 0) {
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
                this._productService.deleteMultipleIds(selectedIdsOnCurrentPage)
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