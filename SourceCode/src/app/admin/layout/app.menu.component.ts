import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.model = [
            {
                label: 'System',
                items: [
                    {
                        label: 'Management Page',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/admin'],
                    },
                    {
                        label: 'Account',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/admin/user'],
                    },
                ],
            },
            {
                label: 'Travel',
                items: [
                    {
                        label: 'Destination',
                        icon: 'pi pi-fw pi-user-edit',
                        routerLink: ['/admin/destination'],
                    },
                    {
                        label: 'Packages',
                        icon: 'pi pi-map-marker',
                        routerLink: ['/admin/packages'],
                    },
                ],
            },
        ];
    }
}
