import { NgModule } from '@angular/core';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { SettingsModule } from 'app/layout/common/settings/settings.module';
import { SharedModule } from 'app/shared/shared.module';
import { MasterSettingsComponent } from './settings.component';
import { CompanyListComponent } from './company/company.component';
import { DowntimeGuideListComponent } from './downtime/downtime.component';
import { Route, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductRequestComponent } from './product-list/product-add/product-add.component';
import { UISharedModule } from '@employee/UIShared.module';
import { DowntimeGuideRequestComponent } from './downtime/donwtime-add/donwtime-add.component';
import { ProductsService } from '@employee/services/products.service';
import { ProductUpdateComponent } from './product-list/product-edit/product-edit.component';
import { DowntimeGuideService } from '@employee/services/downtime.service';
import { DowntimeGuideEditComponent } from './downtime/donwtime-edit/donwtime-edit.component';

const routes: Route[]= [
    {
        path: '',
        component: MasterSettingsComponent
    },
    {
        path: "products",
        component: ProductListComponent
    },
    {
        path: "downtime",
        component: DowntimeGuideListComponent
    },
    {
        path: "company",
        component: CompanyListComponent
    }
];

@NgModule({
    declarations: [
        MasterSettingsComponent,

        ProductListComponent,
        ProductRequestComponent,
        ProductUpdateComponent,
        
        DowntimeGuideListComponent,
        DowntimeGuideRequestComponent,
        DowntimeGuideEditComponent,

        CompanyListComponent,
    ],
    imports: [
        FuseDrawerModule,
        SharedModule,
        SettingsModule,

        // Created Shared Components Modules
        UISharedModule,

        RouterModule.forChild(routes),
    ],
    providers: [
        ProductsService,
        DowntimeGuideService
    ]
})
export class MasterSettingsModule
{
}
