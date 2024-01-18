import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ProductRequestComponent } from './product-add/product-add.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector     : 'product-list',
    templateUrl  : './product-list.component.html',
    styleUrls    : ['./product-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProductListComponent implements AfterViewInit {
    displayedColumns: string[] = ['id', 'code', 'description', 'actions'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    isLoadingResults: boolean = true;
    
    action: string;
    title: string;


    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor( public dialog: MatDialog )
    {

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
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
          console.log('The dialog was closed');
          this.title = result;
        });
    }
}

export interface PeriodicElement {
    code: string;
    id: number;
    description: string;
}
  
const ELEMENT_DATA: PeriodicElement[] = [
    {id: 1, code: '2165', description: 'PURINA BLENDINA HOG GROWER CONC.'},
    {id: 2, code: '2365', description: 'HOGI PLUS GROWER'},
    {id: 3, code: '2372', description: 'PURINA HOGI PLUS HOG FINISHER'},
    {id: 4, code: '2472', description: 'PURINA BLENDINA HOG SOW CONCENTRATE.'},
    {id: 5, code: '2765', description: 'HOGI BROOD SOW PELLET'},
    {id: 6, code: '2772', description: 'HOGI PLUS SOW LACTATION'},
    {id: 7, code: '2972', description: 'PROFARM PIG BOOSTER'},
    {id: 8, code: '3004', description: 'PROFARM PIG PRESTARTER'},
    {id: 9, code: '3054', description: 'PREMIUM NUTRI DELI HOG STARTER'},
    {id: 10, code: '3150', description: 'PURINA TURBO HOG STARTINA'},
    {id: 11, code: '3152', description: 'PROFARM HOG STARTER'},
    {id: 12, code: '3154', description: 'PREMIUM NUTRI DELI HOG GROWER'},
    {id: 13, code: '3350', description: 'TURBO HOG GROWINA'},
    {id: 14, code: '3352', description: 'PROFARM HOG GROWER'},
    {id: 15, code: '3354', description: 'PREMIUM BUTRI DELI HOG FINISHER'},
];
