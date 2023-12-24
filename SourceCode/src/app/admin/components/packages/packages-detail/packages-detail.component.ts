import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageConstants } from 'src/app/_shared/consts';
import { DestinationService, UtilityService } from 'src/app/_shared/services';
import { PackagesDto as PackagesDto } from 'src/app/_shared/models/packages';
import { DropDownItem } from 'src/app/_shared/models';

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

    validationMessages = {
        Name: [
            { type: 'required', message: MessageConstants.REQUIRED_ERROR_MSG },
            { type: 'maxlength', message: `Tên không quá 100 ký tự` },
        ],
        Code: [
            { type: 'required', message: MessageConstants.REQUIRED_ERROR_MSG },
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
    };

    get formControls() {
        return this.form.controls;
    }

    constructor(
        private fb: FormBuilder,
        private utilService: UtilityService,
        private destinationService: DestinationService
    ) { }

    ngOnInit() {
        this.buildForm();
        this.getDestinations();
    }
    getDestinations() {
        this.destinationService.getAll()
            .subscribe(res => {
                this.destinationOptions = res.map(x => new DropDownItem(x.Name, x.Id));
            });
    }
    buildForm() {
        this.form = this.fb.group({
            Id: [null],
            Code: [null, [Validators.required]],
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
