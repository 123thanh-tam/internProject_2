import { NotificationService } from './../../../_shared/services/notification.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageConstants, eUserKind } from 'src/app/_shared/consts';
// import { DestinationDto } from 'src/app/_shared/models';
// import { PackagesDto } from 'src/app/_shared/models/packages';
import { CreateUsersDto, UpdateUsersDto, UsersDto } from 'src/app/_shared/models';
import { UsersService } from 'src/app/_shared/services/users.service';
<<<<<<< HEAD
=======
import { UserKindOptionss } from 'src/app/_shared/consts';
>>>>>>> d72094778688467e794f49726bac4bb8335782ee
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
    UserKindOptionss = UserKindOptionss;

    constructor(
        private notificationService: NotificationService,
        private confirmationService: ConfirmationService,
        private usersService: UsersService
    ) { }

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
    submit(user: UsersDto) {
        this.loading = true;
        if (this.dialogMode == 'create') {
            this.usersService.add(user as CreateUsersDto).then((res) => {
                this.notificationService.showSuccess(
                    MessageConstants.CREATED_OK_MSG
                );
                this.closeDialog();
                this.loading = false;
            });
        } else if (this.dialogMode == 'update') {
            let updateDto = {
                Id: user.Id,
                Name: user.Name,
                Password: user.Password,
                Kind: user.Kind,
                Email: user.Email,
                Phone: user.Phone,
                Avatar: JSON.stringify(user.Avatar)
            } as UpdateUsersDto;
            this.usersService.update(user.Id, updateDto).then((res) => {
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
    delete(user: UsersDto) {
        if (!user) {
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
                    .delete(user)
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
    findUserKind(kind: eUserKind){
        return this.UserKindOptionss.find(x => x.value === kind).text;
    }
}
