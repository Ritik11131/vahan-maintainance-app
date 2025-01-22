
import { Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { OverviewComponent } from './overview/overview.component';
import { DeviceComponent } from './device/device.component';
import { StateComponent } from './state/state.component';
import { BackendComponent } from './backend/backend.component';

export const mainRoutes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'overview',
                component: OverviewComponent
            },
            {
                path: 'device',
                component:DeviceComponent
            },
            {
                path:'state',
                component:StateComponent
            },
            {
                path:'backend',
                component:BackendComponent
            }
        ]
    },
];
