import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageConstants } from 'src/app/_shared/consts';
import { UsersDto } from 'src/app/_shared/models';
import { UsersService } from 'src/app/_shared/services/users.service';
import { UtilityService } from 'src/app/_shared/services';
import { DropDownUsers } from 'src/app/_shared/models/drop-down-users';
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
    usersOptions: DropDownUsers[];
    validationMessages = {
        Name: [
            { type: 'required', message: MessageConstants.REQUIRED_ERROR_MSG },
            { type: 'maxlength', message: `Tên không quá 100 ký tự` },
        ],
        UsersId: [
            { type: 'required', message: MessageConstants.REQUIRED_ERROR_MSG },
        ],
        Email: [
            {
                type: 'required',
                messages: 'Email is required',
            },
            {
                type: 'pattern',
                messages: 'Email khong hop le.',
            },
        ],
        Kind: [
            {
                type: 'required',
                messages: 'Email khong hop le.',
            },
        ],
        Phone: [
            { type: 'required', messages: 'Email khong hop le.' },
            { type: 'maxlength', message: `SDT không quá 10 ký tự` },
        ],
    };
    get formControls() {
        return this.form.controls;
    }

    constructor(
        private fb: FormBuilder,
        private usersService: UsersService,
        private utilService: UtilityService
    ) {}

    ngOnInit() {
        this.buildForm();
        this.getKindUsers;
    }
    getKindUsers() {
        this.usersService.getAll().subscribe((res) => {
            this.usersOptions = res.map((x) => new DropDownUsers(x.Kind));
        });
    }
    buildForm() {
        this.form = this.fb.group({
            UsersId: [null, Validators.required],
            Name: [null, [Validators.required, Validators.maxLength(100)]],
            Kind: [null, Validators.required],
            Email: [
                null,
                [
                    Validators.required,
                    Validators.pattern(
                        '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
                    ),
                ],
            ],
            Phone: [null, [Validators.required, Validators.maxLength(10)]],
        });
        if (this.item) this.form.patchValue(this.item);
        if (this.mode == 'view') this.form.disable();
    }
    saveChange() {
        this.utilService.markAllControlsAsDirty([this.form]);
        if (this.form.invalid) return;
        let dto = this.form.value as UsersDto;
        this.submitForm.emit(dto);
    }
    closeModal() {
        this.close.emit();
    }
}