import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MessageConstants } from 'src/app/_shared/consts';
import { UserKindOptionss } from 'src/app/_shared/consts';
import { UsersDto } from 'src/app/_shared/models';
import { UsersService } from 'src/app/_shared/services/users.service';
import { UtilityService } from 'src/app/_shared/services';
import { DropDownItem } from 'src/app/_shared/models';
@Component({
    selector: 'app-users-detail',
    templateUrl: './users-detail.component.html',
    styleUrls: ['./users-detail.component.css'],
})
export class UsersDetailComponent implements OnInit {
    @Input() mode: 'create' | 'update' | 'view' = 'view';
    @Input() id: string | undefined;
    @Input() item: UsersDto | undefined;

    @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
    @Output() close: EventEmitter<any> = new EventEmitter();

    form: FormGroup;
    title: string;
    UserKindOptionss: DropDownItem[] = UserKindOptionss;
    selectedFiles?: FileList;
    percentage = 0;

    validationMessages = {
        Name: [
            { type: 'required', message: MessageConstants.REQUIRED_ERROR_MSG },
            { type: 'maxlength', message: `Name không quá 100 ký tự` },
        ],
        UserName: [
            { type: 'required', message: MessageConstants.REQUIRED_ERROR_MSG },
            { type: 'maxlength', message: `Name không quá 50 ký tự` },
        ],
        Email: [
            { type: 'required', message: MessageConstants.REQUIRED_ERROR_MSG },
            { type: 'email', message: 'Địa chỉ email không chính xác' },
        ],
        Password: [
            { type: 'required', message: MessageConstants.REQUIRED_ERROR_MSG },
            {
                type: 'pattern',
                message: 'Mật khẩu ít nhất 8 ký tự, ít nhất 1 số, 1 ký tự đặc biệt, và một chữ hoa',
            },
        ],
        ConfirmPassword: [
            { type: 'required', message: 'Xác nhận mật khẩu không chính xác' },
            { type: 'passwordMismatch', message: 'Xác nhận mật khẩu không chính xác' },
        ],
        Kind: [
            { type: 'required', message: MessageConstants.REQUIRED_ERROR_MSG },
        ],
        Phone: [
            { type: 'required', message: MessageConstants.REQUIRED_ERROR_MSG },
            { type: 'pattern', message: 'Số ĐT không chính xác' },
        ],
    };
    get formControls() {
        return this.form.controls;
    }

    constructor(
        private fb: FormBuilder,
        private usersService: UsersService,
        private utilService: UtilityService
    ) { }

    ngOnInit() {
        this.buildForm();
    }
    buildForm() {
        let password = new FormControl(
            null,
            Validators.compose([
                Validators.required,
                Validators.pattern(
                    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}$'
                ),
            ])
        );
        this.form = this.fb.group({
            Id: [null],
            UserName: [null, [Validators.required, Validators.maxLength(50)]],
            Name: [null, [Validators.required, Validators.maxLength(100)]],
            Kind: [null, Validators.required],
            Email: [null, [Validators.required, Validators.email]],
            Phone: [null, [Validators.required, Validators.pattern('^(0[0-9]{9}|\\+84[0-9]{9})$')]],
            Password: password,
            ConfirmPassword: new FormControl(null, [this.matchPasswordValidator(password)]),
        });
        if (this.item) {
            this.form.patchValue(this.item);
            this.form.get('ConfirmPassword').setValue(this.item.Password);
        }
        if (this.mode == 'view') this.form.disable();
    }
    matchPasswordValidator(otherControl: AbstractControl): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const match = otherControl.value === control.value;
            return match ? null : { passwordMismatch: true };
        };
    }
    saveChange() {
        this.utilService.markAllControlsAsDirty([this.form]);
        if (this.form.invalid) return;
        let dto = this.form.value as UsersDto;
        dto.Avatar = this.item.Avatar;
        this.submitForm.emit(dto);
    }
    closeModal() {
        this.close.emit();
    }
    selectFile(event: any): void {
        this.selectedFiles = event.target.files;
    }
    upload(): void {
        if (this.selectedFiles) {
            const file: File | null = this.selectedFiles.item(0);
            this.selectedFiles = undefined;

            if (file) {
                this.usersService.upload(this.item, file).subscribe(
                    (percentage) => {
                        this.percentage = Math.round(
                            percentage ? percentage : 0
                        );
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            }
        }
    }
}
