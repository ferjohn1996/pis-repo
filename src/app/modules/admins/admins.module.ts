import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { SettingsModule } from 'app/layout/common/settings/settings.module';
import { SharedModule } from 'app/shared/shared.module';
import { Route, RouterModule } from '@angular/router';
import { UserListComponent } from './user-lists/user-lists.component';

const routes: Route[] = [
    {
        path     : 'lists',
        component: UserListComponent
    }
];

@NgModule({
    declarations: [
        UserListComponent
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
export class AdminsModule
{
}
