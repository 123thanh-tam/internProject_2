import { Component, OnInit } from '@angular/core';
import { Destination } from 'src/app/_shared/model';
import { DestinationService } from 'src/app/_shared/service/destination.service';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss']
})
export class DestinationComponent implements OnInit {

  items: Destination[] = [];
  constructor(private destinationService: DestinationService) { }

  ngOnInit() {
    this.getData();
    let des = new Destination(
      'hai', 'haitc test',
      ['image1.jpg', 'unage2.png'],
      5,
      0.3);
    // this.addDestination(des);
    this.get("0wMKKoKORZFQR1a4AjqT");
    // this.get(8414);

  }
  get(id) {
    this.destinationService.get(id)
      .subscribe(res => {
        console.log(res);
      });
  }
  addDestination(data: Destination) {
    this.destinationService.add(data)
      .then(res => {
        console.log(res);
      });
  }
  getData() {
    this.destinationService.getAll()
      .subscribe(res => {
        this.items = res as Destination[];
        console.log(this.items);
      });
  }
}
