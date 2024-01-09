import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { SettingsModule } from 'app/layout/common/settings/settings.module';
import { SharedModule } from 'app/shared/shared.module';
import { Route, RouterModule, Routes } from '@angular/router';
import { UserRequestComponent } from './user.component';
import { PlanningComponent } from './planning/planning.component';
import { BatchingComponent } from './batching/batching.component';
import { PellitingComponent } from './pelitting/pelitting.component';
import { PackingComponent } from './packing/packing.component';

const routes: Route[] = [
    {
        path     : '',
        component: UserRequestComponent
    },
    {
        path: 'plannning',
        component: PlanningComponent
    },
    {
        path: "batching",
        component: BatchingComponent
    },
    {
        path: "pelliting",
        component: PellitingComponent
    },
    {
        path: "packing",
        component: PackingComponent
    }
];

@NgModule({
    declarations: [
        UserRequestComponent,
        PlanningComponent,
        BatchingComponent,
        PellitingComponent,
        PackingComponent
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
export class UserRequestModule
{
}
