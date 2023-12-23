import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageConstants } from 'src/app/_shared/consts';
import { Destination } from 'src/app/_shared/models';
import { NotificationService } from 'src/app/_shared/services';
import { DestinationService } from 'src/app/_shared/services/destination.service';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss']
})
export class DestinationComponent implements OnInit {

  items: Destination[] = [];
  loading: boolean = false;
  constructor(
    private destinationService: DestinationService,
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService
  ) { }

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
  add(data: Destination) {
    this.destinationService.add(data)
      .then(res => {
        console.log(res);
      });
  }
  getData() {
    this.loading = true;
    this.destinationService.getAll()
      .subscribe(res => {
        this.items = res;
        this.loading = false;
        // console.log(this.items);
      });
  }

  delete(id) {
    if (!id) {
      this.notificationService.showError(MessageConstants.NOT_CHOOSE_ANY_RECORD);
      return;
    }
    this.confirmationService.confirm({
      message: MessageConstants.CONFIRM_DELETE_MSG,
      accept: () => {
        this.loading = true;
        this.destinationService
          .delete(id)
          .then(res => {
            this.notificationService.showSuccess(MessageConstants.DELETED_OK_MSG);
            this.getData();
            this.loading = false;
          })
          .catch(err => {
            this.loading = false;
            console.error('Delete Destomatopm Errpr:', err);
          });
      },
    });
  }

}
