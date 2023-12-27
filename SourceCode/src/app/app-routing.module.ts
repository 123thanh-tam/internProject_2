import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './notfound/notfound.component';
import { AppLayoutComponent as AdminLayoutComponent } from './admin/layout/app.layout.component';
import { HomeComponent } from './portal/components/home/home.component';
import { LayoutComponent } from './portal/layout/layout.component';
import { AboutComponent } from './portal/components/about/about.component';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    component: LayoutComponent,
                    children: [
                        {
                            path: '',
                            component: HomeComponent,
                        },
                    ],
                },
                {
                    path: '',
                    component: LayoutComponent,
                    children: [
                        {
                            path: 'about',
                            component: AboutComponent,
                        },
                    ],
                },
                {
                    path: 'admin',
                    component: AdminLayoutComponent,
                    children: [
                        {
                            path: '',
                            loadChildren: () =>
                                import(
                                    './admin/components/dashboard/dashboard.module'
                                ).then((m) => m.DashboardModule),
                        },
                        {
                            path: 'user',
                            loadChildren: () =>
                                import(
                                    './admin/components/user/user.module'
                                ).then((m) => m.UserModule),
                        },
                        {
                            path: 'destination',
                            loadChildren: () =>
                                import(
                                    './admin/components/destination/destination.module'
                                ).then((m) => m.DestinationModule),
                        },
                        {
                            path: 'packages',
                            loadChildren: () =>
                                import(
                                    './admin/components/packages/packages.module'
                                ).then((m) => m.PackagesModule),
                        },
                        {
                            path: 'tours',
                            loadChildren: () =>
                                import(
                                    './admin/components/tours/tours.module'
                                ).then((m) => m.ToursModule),
                        },
                    ],
                },
                {
                    path: 'auth',
                    loadChildren: () =>
                        import('./auth/auth.module').then((m) => m.AuthModule),
                },
                { path: 'notfound', component: NotfoundComponent },
                { path: '**', redirectTo: '/notfound' },
            ],
            {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                onSameUrlNavigation: 'reload',
            }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
