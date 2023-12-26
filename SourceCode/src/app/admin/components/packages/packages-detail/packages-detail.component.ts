import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageConstants, eUserKind } from 'src/app/_shared/consts';
import { DestinationService, UtilityService } from 'src/app/_shared/services';
import { PackagesDto as PackagesDto } from 'src/app/_shared/models/packages';
import { DropDownItem } from 'src/app/_shared/models';
import { UsersService } from 'src/app/_shared/services/users.service';

@Component({
    selector: 'app-packages-detail',
    templateUrl: './packages-detail.component.html',
    styleUrls: ['./packages-detail.component.scss'],
})
export class PackagesDetailComponent implements OnInit {
    @Input() mode: 'create' | 'update' | 'view' = 'view';
    @Input() id: string | undefined;
    @Input() item: PackagesDto | undefined;

    @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
    @Output() close: EventEmitter<any> = new EventEmitter();

    form: FormGroup;
    title: string;
    destinationOptions: DropDownItem[];
    travelGuideOptions: DropDownItem[] = [];

    validationMessages = {
        Name: [
            { type: 'required', message: MessageConstants.REQUIRED_ERROR_MSG },
            { type: 'maxlength', message: `Name không quá 100 ký tự` },
        ],
        Code: [
            { type: 'required', message: MessageConstants.REQUIRED_ERROR_MSG },
            { type: 'maxlength', message: `Name không quá 50 ký tự` },
        ],
        DestinationId: [
            { type: 'required', message: MessageConstants.REQUIRED_ERROR_MSG },
        ],
        People: [
            { type: 'required', message: MessageConstants.REQUIRED_ERROR_MSG },
        ],
        Price: [
            { type: 'required', message: MessageConstants.REQUIRED_ERROR_MSG },
        ],
        StartDate: [
            { type: 'required', message: MessageConstants.REQUIRED_ERROR_MSG },
        ],
        DateCount: [
            { type: 'required', message: MessageConstants.REQUIRED_ERROR_MSG },
        ],
        TravelGuideIdss: [
            { type: 'required', message: MessageConstants.REQUIRED_ERROR_MSG },
        ],
    };

    get formControls() {
        return this.form.controls;
    }

    constructor(
        private fb: FormBuilder,
        private utilService: UtilityService,
        private destinationService: DestinationService,
        private usersService: UsersService
    ) { }

    ngOnInit() {
        this.buildForm();
        this.getOptions();
    }
    getOptions() {
        this.destinationService.getAll()
            .subscribe(res => {
                this.destinationOptions = res.map(x => new DropDownItem(x.Name, x.Id));
            });
        this.usersService.getAll()
            .subscribe(res => {
                res.forEach(x => {
                    if (x.Kind == eUserKind.TravelGuide) {
                        this.travelGuideOptions.push(new DropDownItem(x.UserName, x.Id));
                    }
                });
            });
    }
    buildForm() {
        this.form = this.fb.group({
            Id: [null],
            Code: [null, [Validators.required, Validators.maxLength(50)]],
            Name: [
                null,
                [Validators.required, Validators.maxLength(100)],
            ],
            DestinationId: [null, Validators.required],
            StartDate: [null, Validators.required],
            DateCount: [null, Validators.required],
            People: [null],
            Price: [null, Validators.required],
            Discount: [null],
            TravelGuideIdss: [null],
        });
        if (this.item) this.form.patchValue(this.item);
        if (this.mode == 'view') this.form.disable();
    }
    saveChange() {
        this.utilService.markAllControlsAsDirty([this.form]);
        if (this.form.invalid) return;
        let dto = this.form.value as PackagesDto;
        this.submitForm.emit(dto);
    }
    closeModal() {
        this.close.emit();
    }
}
