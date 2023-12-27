import { NotificationService } from './../../../_shared/services/notification.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageConstants } from 'src/app/_shared/consts';
// import { DestinationDto } from 'src/app/_shared/models';
// import { PackagesDto } from 'src/app/_shared/models/packages';
import { UsersDto } from 'src/app/_shared/models';
import { UsersService } from 'src/app/_shared/services/users.service';
@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
    items: UsersDto[] = [];
    loading: boolean = false;

    visibleDialog: boolean = false;
    selectedItem: UsersDto;
    dialogMode: 'create' | 'update' | 'view' = 'view';
    dialogHeader = '';

    constructor(
        private notificationService: NotificationService,
        private confirmationService: ConfirmationService,
        private usersService: UsersService
    ) {}

    ngOnInit() {
        this.getData();
    }
    getData() {
        this.loading = true;
        this.usersService.getAll().subscribe((res) => {
            this.items = res;
            this.loading = false;
        });
    }
    showDialog(mode: 'create' | 'update' | 'view', data: UsersDto | undefined) {
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
    submit(data: UsersDto) {
        this.loading = true;
        if (this.dialogMode == 'create') {
            this.usersService.add(data).then((res) => {
                this.notificationService.showSuccess(
                    MessageConstants.CREATED_OK_MSG
                );
                this.closeDialog();
                this.loading = false;
            });
        } else if (this.dialogMode == 'update') {
            this.usersService.update(data.Id, data).then((res) => {
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
                this.usersService
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
                        console.error('Delete Users Error:', err);
                    });
            },
        });
    }
}
