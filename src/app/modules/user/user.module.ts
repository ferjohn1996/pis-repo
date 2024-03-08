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
import { PlanningDetails1Service } from '@employee/services/planning-details1.service';
import { Planning1Service } from '@employee/services/planning1.service';
import { PlanningAddLine1Component } from './planning-details/line1-add/line1-add.component';
import { PlanningEditLine1Component } from './planning-details/line1-edit/line1-edit.component';
import { PlanningViewLine1Component } from './planning-details/line1-view/line1-view.component';
import { PlanningAddLine2Component } from './planning-details/line2-add/line2-add.component';
import { PlanningEditLine2Component } from './planning-details/line2-edit/line2-edit.component';
import { PlanningViewLine2Component } from './planning-details/line2-view/line2-view.component';
import { PlanningAddLine3Component } from './planning-details/line3-add/line3-add.component';
import { PlanningEditLine3Component } from './planning-details/line3-edit/line3-edit.component';
import { PlanningViewLine3Component } from './planning-details/line3-view/line3-view.component';

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
            data: PlanningDetails1Service
        }
    },
    {
        path: "details/:id/:handle",
        component: PlanningDetailsComponent,
        resolve: {
            data: PlanningDetails1Service
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
        PlanningEditLine1Component,
        PlanningViewLine1Component,

        PlanningAddLine2Component,
        PlanningEditLine2Component,
        PlanningViewLine2Component,

        PlanningAddLine3Component,
        PlanningEditLine3Component,
        PlanningViewLine3Component,
        
        
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
        PlanningDetailsService,
        PlanningDetails1Service,
        Planning1Service
    ]
})
export class UserRequestModule
{
}
