import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { SettingsModule } from 'app/layout/common/settings/settings.module';
import { SharedModule } from 'app/shared/shared.module';
import { Route, RouterModule, Routes } from '@angular/router';
import { PISDashboardComponent } from './pis-dashboard.component';

const routes: Route[] = [
    {
        path     : '',
        component: PISDashboardComponent
    }
];

@NgModule({
    declarations: [
        PISDashboardComponent
    ],
    imports: [
        MatIconModule,
        MatTooltipModule,
        FuseDrawerModule,
        SharedModule,
        SettingsModule,

        RouterModule.forChild(routes)
    ]
})
export class PISDashboardModule
{
}
