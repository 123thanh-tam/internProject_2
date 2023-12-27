import { Component, OnInit } from '@angular/core';
import { PackagesDto } from 'src/app/_shared/models';
import { DestinationDto } from 'src/app/_shared/models';
import { UsersDto } from 'src/app/_shared/models';
import { NotificationService } from 'src/app/_shared/services';
import { DestinationService } from 'src/app/_shared/services';
import { PackagesService } from 'src/app/_shared/services';
import { UsersService } from 'src/app/_shared/services/users.service';
import { ConfirmationService } from 'primeng/api';
import { MessageConstants, eUserKind } from 'src/app/_shared/consts';
import { ToursDto } from 'src/app/_shared/models/tours';
import { ToursService } from 'src/app/_shared/services/tours.service';
import { forkJoin } from 'rxjs';
@Component({
    selector: 'app-tours',
    templateUrl: './tours.component.html',
    styleUrls: ['./tours.component.css'],
})
export class ToursComponent implements OnInit {
    tours: ToursDto[] = [];
    loading: boolean = false;
    destinations: DestinationDto[] = [];
    users: UsersDto[] = [];
    packages: PackagesDto[] = [];

    visibleDialog: boolean = false;
    selectedItem: ToursDto;
    dialogMode: 'create' | 'update' | 'view' = 'view';
    dialogHeader = '';
    constructor(
        private packagesService: PackagesService,
        private notificationService: NotificationService,
        private confirmationService: ConfirmationService,
        private destinationService: DestinationService,
        private toursService: ToursService,
        private usersService: UsersService
    ) { }

    ngOnInit() {
        this.getData();
    }
    getData() {
        this.loading = true;
        this.toursService.getAll().subscribe(res => {
            this.tours = res;
            this.loading = false;
        });
        this.destinationService.getAll().subscribe(res => {
            this.destinations = res;
            this.loading = false;
        });
        this.packagesService.getAll().subscribe(res => {
            this.packages = res;
            this.loading = false;
        });
        this.usersService.getAll().subscribe(res => {
            this.users = res;
            this.loading = false;
        });
    }
    showDialog(mode: 'create' | 'update' | 'view', data: ToursDto | undefined) {
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
    submit(data: ToursDto) {
        this.loading = true;
        if (this.dialogMode == 'create') {
            this.toursService.add(data).then((res) => {
                this.notificationService.showSuccess(
                    MessageConstants.CREATED_OK_MSG
                );
                this.closeDialog();
                this.getData();
                this.loading = false;
            });
        } else if (this.dialogMode == 'update') {
            this.toursService.update(data.Id, data).then((res) => {
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
                this.toursService
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
                        console.error('Delete Tour Error:', err);
                    });
            },
        });
    }
    findDes(id: string): DestinationDto {
        return this.destinations.find((x) => x.Id == id);
    }
    findUser(id): UsersDto {
        return this.users.find((x) => x.Id == id);
    }
    findPack(id: string): PackagesDto {
        return this.packages.find((x) => x.Id == id);
    }
}
