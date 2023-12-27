import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { find } from 'rxjs';
import { PackagesService } from 'src/app/_shared/services';
import { DestinationService } from 'src/app/_shared/services';

@Component({
    selector: 'app-destinations',
    templateUrl: './destinations.component.html',
    styleUrls: ['./destinations.component.scss'],
})
export class DestinationsComponent implements OnInit {
    constructor(
        private packageService: PackagesService,
        private destinationService: DestinationService
    ) {}
    packages: any = [];
    destinations: any = [];
    images: any[];
    ngOnInit() {
        this.refreshPackages();
        this.refreshDestinations();
    }
    refreshPackages() {
        this.packageService.getAll().subscribe((res) => {
            this.packages = res;
            for (let pac in this.packages) {
                //    let des=  this.findDestination(pac.DestnationId);
            }
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
