import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageConstants } from 'src/app/_shared/consts';
import { DestinationDto } from 'src/app/_shared/models';
import { PackagesDto } from 'src/app/_shared/models/packages';
import { DestinationService, NotificationService } from 'src/app/_shared/services';
import { PackagesService } from 'src/app/_shared/services/packages.service';
@Component({
    selector: 'app-packages',
    templateUrl: './packages.component.html',
    styleUrls: ['./packages.component.scss'],
})
export class PackagesComponent implements OnInit {
    items: PackagesDto[] = [];
    loading: boolean = false;
    destinations: DestinationDto[] = [];

    visibleDialog: boolean = false;
    selectedItem: PackagesDto;
    dialogMode: 'create' | 'update' | 'view' = 'view';
    dialogHeader = '';

    constructor(
        private packagesService: PackagesService,
        private notificationService: NotificationService,
        private confirmationService: ConfirmationService,
        private destinationService: DestinationService,
    ) { }

    ngOnInit() {
        // Quên câu này s mà ra data :)
        this.getData();
        this.getDestinations();
    }

    getData() {
        this.loading = true;
        this.packagesService.getAll().subscribe((res) => {
            this.items = res;
            this.loading = false;
        });
    }

    getDestinations() {
        this.loading = true;
        this.destinationService.getAll()
            .subscribe(res => {
                this.destinations = res;
                this.loading = false;
            });
    }
    showDialog(
        mode: 'create' | 'update' | 'view',
        data: PackagesDto | undefined
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
        this.visibleDialog = true;
    }
    submit(data: PackagesDto) {
        this.loading = true;
        if (this.dialogMode == 'create') {
            this.packagesService.add(data).then((res) => {
                this.notificationService.showSuccess(
                    MessageConstants.CREATED_OK_MSG
                );
                this.closeDialog();
                this.loading = false;
            });
        } else if (this.dialogMode == 'update') {
            this.packagesService.update(data.Id, data).then((res) => {
                this.notificationService.showSuccess(
                    MessageConstants.UPDATED_OK_MSG
                );
                this.closeDialog();
                this.loading = false;
            });
        }
    }
    closeDialog() {
        this.dialogHeader = '';
        this.visibleDialog = false;
        this.selectedItem = null;
    }
    delete(id) {
        if (!id) {
            this.notificationService.showError(
                MessageConstants.NOT_CHOOSE_ANY_RECORD
            );
            return;
        }
        this.confirmationService.confirm({
            message: MessageConstants.CONFIRM_DELETE_MSG,
            accept: () => {
                this.loading = true;
                this.packagesService
                    .delete(id)
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
    findDestination(id: string) {
        return this.destinations.find(x => x.Id == id);
    }
}
