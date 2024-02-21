import { NgModule } from '@angular/core';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { SettingsModule } from 'app/layout/common/settings/settings.module';
import { SharedModule } from 'app/shared/shared.module';
import { Route, RouterModule, Routes } from '@angular/router';
import { UserRequestComponent } from './user.component';
import { PlanningComponent } from './planning/planning.component';
import { BatchingComponent } from './batching/batching.component';
import { PellitingComponent } from './pelitting/pelitting.component';
import { PackingComponent } from './packing/packing.component';
import { UISharedModule } from '@employee/UIShared.module';
import { PlanningService } from '@employee/services/planning.service';
import { PlanningDetailsService } from '@employee/services/planning-details.service';
import { PlanningDetailsComponent } from './planning-details/planning-details';
import { PlanningAddDiaglogComponent } from './planning-add/planning-add.component';
import { PlanningAddLine1Component } from './planning-details/add-line1/add-line1.component';

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
        path: "details/:id",
        component: PlanningDetailsComponent,
        resolve: {
            data: PlanningDetailsService
        }
    },
    {
        path: "details/:id/:handle",
        component: PlanningDetailsComponent,
        resolve: {
            data: PlanningDetailsService
        }
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
        PlanningDetailsComponent,
        PlanningAddDiaglogComponent,
        PlanningAddLine1Component,
        
        BatchingComponent,
        PellitingComponent,
        PackingComponent
    ],
    imports: [
        FuseDrawerModule,
        SharedModule,
        SettingsModule,

        // Created Shared Components Modules
        UISharedModule,

        RouterModule.forChild(routes)
    ],
    providers: [
        PlanningService,
        PlanningDetailsService
    ]
})
export class UserRequestModule
{
}
