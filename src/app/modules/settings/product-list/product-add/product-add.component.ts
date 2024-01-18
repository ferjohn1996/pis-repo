import { Component, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { Subject } from 'rxjs';

@Component({
    selector     : 'product-add',
    templateUrl  : './product-add.component.html',
    styleUrls    : ['./product-add.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ProductRequestComponent implements OnInit, OnDestroy {


    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor( 
        public dialogRef: MatDialogRef<ProductRequestComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any)
    {

    }

    /**
     * On init
     */
    ngOnInit(): void
    {
        // this.dataSource.paginator = this.paginator;
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