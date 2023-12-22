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
                label: 'Trang quản trị',
                icon: 'pi pi-fw pi-home',
                routerLink: ['/admin']
            },
            {
                label: 'Quản lý Tài khoản',
                items: [
                    {
                        label: 'Tài khoản',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/admin/user'],
                    },
                    {
                        label: 'Phân quyền',
                        icon: 'pi pi-fw pi-user-edit',
                        routerLink: ['/admin/role'],
                    },]
            },
        ];
    }
}
