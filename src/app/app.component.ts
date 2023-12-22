import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
// import { SharedService } from './portal/layout/shared.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    constructor(
        private primengConfig: PrimeNGConfig
    ) // private service: SharedService
    {}
    // constructor(){}
    // guides: any = [];
    // refreshGuides() {
    //     this.service.getGuides().subscribe((res) => {
    //         this.guides = res;
    //     });
    // }
    ngOnInit() {
        this.primengConfig.ripple = true;
        // this.refreshGuides();
    }
    // addGuides(guideId: number, name: string, idDes: number) {
    //     this.service.addGuides(guideId, name, idDes).then((res) => {
    //         console.log(res);
    //         this.refreshGuides();
    //     });
    // }
    // deleteGuide(id: number) {
    //     this.service.deleteGuide(id).then((res) => {
    //         console.log(res);
    //         this.refreshGuides();
    //     });
    // }
}
