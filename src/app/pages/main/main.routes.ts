
import { Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OverviewComponent } from './overview/overview.component';

export const mainRoutes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'overview',
                component: OverviewComponent
            },
            // {
            //     path: 'dashboard',
            //     component: DashboardComponent
            // }
        ]
    },
];
