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

        CompanyListComponent,
        DowntimeGuideListComponent
    ],
    imports: [
        FuseDrawerModule,
        SharedModule,
        SettingsModule,

        // Created Shared Components Modules
        UISharedModule,

        RouterModule.forChild(routes),
    ]
})
export class MasterSettingsModule
{
}
