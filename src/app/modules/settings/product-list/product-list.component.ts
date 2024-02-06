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

@Component({
    selector     : 'product-list',
    templateUrl  : './product-list.component.html',
    styleUrls    : ['./product-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProductListComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = [
        'id', 
        'code', 
        'description', 
        'createdDateTime', 
        'actions'
    ];
    dataSource = new MatTableDataSource<any>();

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

    openAddProductDialog(): void {
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

    openEditProductDialog(product): void {
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

    deleteProductClass(productId): void {
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
}