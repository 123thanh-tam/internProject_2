import { Routes, RouterModule } from '@angular/router';
import { PackagesComponent } from './packages.component';
const routes: Routes = [
    {
        path: '',
        component: PackagesComponent,
    },
];

export const PackagesRoutes = RouterModule.forChild(routes);
