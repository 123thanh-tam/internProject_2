import { Routes, RouterModule } from '@angular/router';
import { ToursComponent } from './tours.component';
const routes: Routes = [
    {
        path: '',
        component: ToursComponent,
    },
];

export const ToursRoutes = RouterModule.forChild(routes);
