import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];


    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Hệ thống',
                items: [
                    {
                        label: 'Trang quản trị',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/admin']
                    },
                    {
                        label: 'Tài khoản',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/admin/user'],
                    }
                ]
            },
            {
                label: 'Du lịch',
                items: [
                    {
                        label: 'Điểm du lịch',
                        icon: 'pi pi-fw pi-user-edit',
                        routerLink: ['/admin/destination']
                    }]
            }
        ];
    }
}
