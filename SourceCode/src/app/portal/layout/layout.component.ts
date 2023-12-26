import { Component, OnInit } from '@angular/core';
import { PackagesService } from 'src/app/_shared/services';
@Component({
    selector: 'app-portal-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
    constructor(
        private packageService: PackagesService
    ) { }
    ngOnInit() {

    }
}
