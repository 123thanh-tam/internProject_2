import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageConstants } from 'src/app/_shared/consts';
import { DestinationDto } from 'src/app/_shared/models';
import {
    FileUploadService,
    NotificationService,
} from 'src/app/_shared/services';
import { DestinationService } from 'src/app/_shared/services/destination.service';

@Component({
    selector: 'app-destination',
    templateUrl: './destination.component.html',
    styleUrls: ['./destination.component.scss'],
})
export class DestinationComponent implements OnInit {
    items: DestinationDto[] = [];
    loading: boolean = false;

    // Diablog
    visibleDialogDetail: boolean = false;
    visibleDialogImage: boolean = false;
    selectedItem: DestinationDto;
    dialogMode: 'create' | 'update' | 'view' = 'view';
    dialogHeader = '';

    constructor(
        private destinationService: DestinationService,
        private notificationService: NotificationService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.getData();
    }
    getData() {
        this.loading = true;
        this.destinationService.getAll().subscribe((res) => {
            this.items = res;
            this.loading = false;
            // console.log(this.items);
        });
    }
    showDialogImage(data: DestinationDto) {
        this.dialogHeader = 'Quản lý ảnh';
        this.selectedItem = data;
        this.visibleDialogImage = true;
    }

    showDialogDetail(
        mode: 'create' | 'update' | 'view',
        data: DestinationDto | undefined
    ) {
        switch (mode) {
            case 'create':
                this.dialogHeader = 'Thêm mới';
                break;
            case 'update':
                this.dialogHeader = 'Cập nhật';
                break;
            default:
                this.dialogHeader = 'Chi tiết';
                break;
        }
        this.dialogMode = mode;
        this.selectedItem = data;
        this.visibleDialogDetail = true;
    }
    submit(data: DestinationDto) {
        this.loading = true;
        if (this.dialogMode == 'create') {
            this.destinationService.add(data).then((res) => {
                this.notificationService.showSuccess(
                    MessageConstants.CREATED_OK_MSG
                );
                this.closeDialog();
                this.getData();
                this.loading = false;
            });
        } else if (this.dialogMode == 'update') {
            this.destinationService.update(data.Id, data).then((res) => {
                this.notificationService.showSuccess(
                    MessageConstants.UPDATED_OK_MSG
                );
                this.closeDialog();
                this.getData();
                this.loading = false;
            });
        }
    }

    closeDialog() {
        this.dialogHeader = '';
        this.visibleDialogDetail = false;
        this.selectedItem = null;
        this.visibleDialogImage = false;
    }
    delete(data: DestinationDto) {
        if (!data) {
            this.notificationService.showError(
                MessageConstants.NOT_CHOOSE_ANY_RECORD
            );
            return;
        }
        this.confirmationService.confirm({
            message: MessageConstants.CONFIRM_DELETE_MSG,
            accept: () => {
                this.loading = true;
                this.destinationService
                    .delete(data)
                    .then((res) => {
                        this.notificationService.showSuccess(
                            MessageConstants.DELETED_OK_MSG
                        );
                        this.getData();
                        this.loading = false;
                    })
                    .catch((err) => {
                        this.loading = false;
                        console.error('Delete Destomatopm Errpr:', err);
                    });
            },
        });
    }
}
