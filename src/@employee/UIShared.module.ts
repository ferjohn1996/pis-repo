import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatRippleModule } from "@angular/material/core";
import { MatChipsModule } from "@angular/material/chips";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserModule } from "@angular/platform-browser";
import { MatRadioModule } from "@angular/material/radio";
import { MatCardModule } from "@angular/material/card";
import { SharedModule } from "app/shared/shared.module";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule } from "@angular/common/http";
import { FuseConfirmDialogModule } from "@fuse/components/confirm-dialog/confirm-dialog.module";
import { MatSelectFilterModule } from "mat-select-filter";

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTableModule,
        MatToolbarModule,
        MatChipsModule,
        MatExpansionModule,
        MatPaginatorModule,
        MatSelectModule,
        MatSnackBarModule,
        MatSortModule,
        MatTabsModule,
        MatTooltipModule,
        MatAutocompleteModule,
        MatGridListModule,
        MatProgressBarModule,
        SharedModule,
        MatRadioModule,
        MatDividerModule,
        FlexLayoutModule,

        HttpClientModule,
        FuseConfirmDialogModule,

        MatSelectFilterModule,
    ],
    exports: [
        CommonModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTableModule,
        MatToolbarModule,
        MatChipsModule,
        MatExpansionModule,
        MatPaginatorModule,
        MatSelectModule,
        MatSnackBarModule,
        MatSortModule,
        MatTabsModule,
        MatTooltipModule,
        MatAutocompleteModule,
        MatGridListModule,
        MatProgressBarModule,
        SharedModule,
        MatRadioModule,
        MatCardModule,
        MatDividerModule,
        FlexLayoutModule,

        HttpClientModule,
        FuseConfirmDialogModule,

        MatSelectFilterModule
    ]
})
export class UISharedModule { }
