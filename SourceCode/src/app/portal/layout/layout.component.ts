import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared.service';
import { DestinationService } from 'src/app/_shared/service/destination.service';

@Component({
    selector: 'app-portal-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
    constructor(
        private service: SharedService,
        private serviceDes: DestinationService
    ) {}
    guides: any = [];
    refreshGuides() {
        this.service.getGuides().subscribe((res) => {
            this.guides = res;
        });
    }
    ngOnInit() {
        // this.primengConfig.ripple = true;
        this.refreshGuides();
        this.refreshDes();
    }
    addGuides(guideId: number, name: string, idDes: number) {
        this.service.addGuides(guideId, name, idDes).then((res) => {
            console.log(res);
            this.refreshGuides();
        });
    }
    deleteGuide(id: number) {
        this.service.deleteGuide(id).then((res) => {
            console.log(res);
            this.refreshGuides();
        });
    }
    // Destination
    destination: any = [];
    refreshDes() {
        this.serviceDes.getDes().subscribe((res) => {
            this.destination = res;
        });
    }
    addDes(
        desId: number,
        name: string,
        description: string,
        img: string,
        rating: number,
        discount: number
    ) {
        this.serviceDes
            .addDes(desId, name, description, img, rating, discount)
            .then((res) => {
                console.log(res);
                this.refreshDes();
            });
    }
    deleteDes(idDes: number) {
        this.serviceDes.deleteDes(idDes).then((res) => {
            console.log(res);
            this.refreshDes();
        });
    }
}
