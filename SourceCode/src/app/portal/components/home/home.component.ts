import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PackagesService } from 'src/app/_shared/services';
import { DestinationService } from 'src/app/_shared/services';
// import { PackagesDto } from 'src/app/_shared/models';
@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
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
    // addPackage(data: PackagesDto ){
    //   this.packageService.add(data).then((res)=>{
    //     this.refreshPackages();
    //   })
    // }
}
