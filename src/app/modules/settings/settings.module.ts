import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { SettingsModule } from 'app/layout/common/settings/settings.module';
import { SharedModule } from 'app/shared/shared.module';
import { MasterSettingsComponent } from './settings.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CompanyListComponent } from './company/company.component';
import { DowntimeGuideListComponent } from './downtime/downtime.component';
import { Route, RouterModule } from '@angular/router';

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
        CompanyListComponent,
        DowntimeGuideListComponent
    ],
    imports: [
        MatIconModule,
        MatTooltipModule,
        FuseDrawerModule,
        SharedModule,
        SettingsModule,

        RouterModule.forChild(routes),
    ]
})
export class MasterSettingsModule
{
}
