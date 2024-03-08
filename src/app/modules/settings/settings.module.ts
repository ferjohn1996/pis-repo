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
import { ProductUploadComponent } from './product-list/product-upload/product-upload.component';
import { ProductViewComponent } from './product-list/product-view/product-view.component';
import { DowntimeGuideViewComponent } from './downtime/donwtime-view/donwtime-view.component';
import { Products1Service } from '@employee/services/products1.service';
import { DowntimeGuide1Service } from '@employee/services/downtime1.service';

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
        ProductUploadComponent,
        ProductViewComponent,
        
        DowntimeGuideListComponent,
        DowntimeGuideRequestComponent,
        DowntimeGuideEditComponent,
        DowntimeGuideViewComponent,

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
        DowntimeGuideService,
        Products1Service,
        DowntimeGuide1Service
    ]
})
export class MasterSettingsModule
{
}
