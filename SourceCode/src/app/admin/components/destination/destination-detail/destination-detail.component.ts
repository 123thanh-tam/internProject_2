import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageConstants, eUserKind } from 'src/app/_shared/consts';
import { DestinationDto as DestinationDto, DropDownItem } from 'src/app/_shared/models';
import { UtilityService } from 'src/app/_shared/services';
import { UsersService } from 'src/app/_shared/services/users.service';

@Component({
    selector: 'app-destination-detail',
    templateUrl: './destination-detail.component.html',
    styleUrls: ['./destination-detail.component.scss'],
})
export class DestinationDetailComponent implements OnInit {
    @Input() mode: 'create' | 'update' | 'view' = 'view';
    @Input() id: string | undefined;
    @Input() item: DestinationDto | undefined;

    @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
    @Output() close: EventEmitter<any> = new EventEmitter();

    form: FormGroup;
    title: string;
    travelGuideOptions: DropDownItem[] = [];

    validationMessages = {
        Code: [
            { type: 'required', message: MessageConstants.REQUIRED_ERROR_MSG },
            { type: 'maxlength', message: `Name không quá 50 ký tự` },
        ],
        Name: [
            { type: 'required', message: MessageConstants.REQUIRED_ERROR_MSG },
            {
                type: 'maxlength',
                message: `Name không quá 100 ký tự`,
            },
        ],
        Description: [
            { type: 'required', message: MessageConstants.REQUIRED_ERROR_MSG },
            {
                type: 'maxlength',
                message: `Mô tả không quá 100 ký tự`,
            },
        ]
    };

    get formControls() {
        return this.form.controls;
    }

    constructor(
        private fb: FormBuilder,
        private utilService: UtilityService,
        private usersService: UsersService
    ) { }

    ngOnInit() {
        this.getOptions();
    }

    getOptions() {
        this.usersService.getAll()
            .subscribe(res => {
                res.forEach(x => {
                    if (x.Kind == eUserKind.TravelGuide) {
                        this.travelGuideOptions.push(new DropDownItem(x.Name, x.Id));
                    }
                });
                this.buildForm();
            });
    }

    buildForm() {
        this.form = this.fb.group({
            Id: [null],
            Code: [null, [Validators.required, Validators.maxLength(50)]],
            Name: [null, [Validators.required, Validators.maxLength(100)]],
            Description: [
                null,
                [Validators.required, Validators.maxLength(100)],
            ],
            Rating: [null],
            Images: [null],
            TravelGuideIdss: [null],
        });
        if (this.item) this.form.patchValue(this.item);
        if (this.mode == 'view') this.form.disable();
    }
    saveChange() {
        this.utilService.markAllControlsAsDirty([this.form]);
        if (this.form.invalid) return;
        let dto = this.form.value as DestinationDto;
        this.submitForm.emit(dto);
    }

    closeModal() {
        this.close.emit();
    }
}
