import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { find } from 'rxjs';
import { PackagesService } from 'src/app/_shared/services';
import { DestinationService } from 'src/app/_shared/services';
@Component({
    selector: 'app-packages',
    templateUrl: './packages.component.html',
    styleUrls: ['./packages.component.scss'],
    standalone: true,
    imports: [CommonModule],
})
export class PackagesComponent implements OnInit {
    constructor(
        private packageService: PackagesService,
        private destinationService: DestinationService
    ) {}
    packages: any = [];
    destinations: any = [];
    ngOnInit() {
        this.refreshPackages();
        this.refreshDestinations();
    }
    refreshPackages() {
        this.packageService.getAll().subscribe((res) => {
            this.packages = res;
        });
    }
    refreshDestinations() {
        this.destinationService.getAll().subscribe((res) => {
            this.destinations = res;
        });
    }
    findDestination(id: string) {
        return this.destinations.find((x) => x.Id == id);
    }
}
