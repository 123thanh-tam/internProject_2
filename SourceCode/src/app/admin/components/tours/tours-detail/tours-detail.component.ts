import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageConstants } from 'src/app/_shared/consts';
import { DestinationService, UtilityService } from 'src/app/_shared/services';
// import { PackagesDto as PackagesDto } from 'src/app/_shared/models/packages';
import { ToursDto } from 'src/app/_shared/models/tours';
import { DropDownItem } from 'src/app/_shared/models';
import { PackagesService } from 'src/app/_shared/services';
import { UsersService } from 'src/app/_shared/services/users.service';
import { ToursService } from 'src/app/_shared/services/tours.service';
@Component({
    selector: 'app-tours-detail',
    templateUrl: './tours-detail.component.html',
    styleUrls: ['./tours-detail.component.css'],
})
export class ToursDetailComponent implements OnInit {
    @Input() mode: 'create' | 'update' | 'view' = 'view';
    @Input() id: string | undefined;
    @Input() item: ToursDto | undefined;

    @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
    @Output() close: EventEmitter<any> = new EventEmitter();

    form: FormGroup;
    title: string;
    destinationsOptions: DropDownItem[];
    priceOptions: DropDownItem[];
    discountOptions: DropDownItem[];
    guidesOptions: DropDownItem[];
    validationMessages = {
        Code: [
            { type: 'required', message: MessageConstants.REQUIRED_ERROR_MSG },
            { type: 'maxlength', message: `Tên không quá 50 ký tự` },
        ],
        NameCustomer: [
            { type: 'required', message: MessageConstants.REQUIRED_ERROR_MSG },
        ],
        NameGuide: [
            { type: 'required', message: MessageConstants.REQUIRED_ERROR_MSG },
        ],
        NameDestination: [
            { type: 'required', message: MessageConstants.REQUIRED_ERROR_MSG },
        ],
        Price: [
            { type: 'required', message: MessageConstants.REQUIRED_ERROR_MSG },
        ],
    };

    get formControls() {
        return this.form.controls;
    }

    constructor(
        private fb: FormBuilder,
        private utilService: UtilityService,
        private toursService: ToursService,
        private destinationsService: DestinationService,
        private usersService: UsersService,
        private packagesService: PackagesService
    ) {}

    ngOnInit() {
        this.buildForm();
        this.getDestinations();
        this.getDiscount();
        this.getGuide();
        this.getPrice();
    }
    getDestinations() {
        this.destinationsService.getAll().subscribe((res) => {
            this.destinationsOptions = res.map(
                (x) => new DropDownItem(x.Name, x.Id)
            );
        });
    }
    getPrice() {
        this.packagesService.getAll().subscribe((res) => {
            this.priceOptions = res.map(
                (x) => new DropDownItem(x.Price.toString(), x.DestinationId)
            );
        });
    }
    getDiscount() {
        this.packagesService.getAll().subscribe((res) => {
            this.discountOptions = res.map(
                (x) => new DropDownItem(x.Discount.toString(), x.DestinationId)
            );
        });
    }
    getGuide() {
        this.usersService.getAll().subscribe((res) => {
            this.guidesOptions = res.map(
                (x) => new DropDownItem(x.Name, x.Kind ? 'guide' : null)
            );
        });
    }
    buildForm() {
        this.form = this.fb.group({
            Id: [null],
            Code: [null, [Validators.required, Validators.maxLength(50)]],
            NameCustomer: [
                null,
                [Validators.required, Validators.maxLength(100)],
            ],
            NameDestination: [null, Validators.required],
            NameGuide: [null, Validators.required],

            Price: [null, Validators.required],
            Discount: [null],
        });
        if (this.item) this.form.patchValue(this.item);
        if (this.mode == 'view') this.form.disable();
    }
    saveChange() {
        this.utilService.markAllControlsAsDirty([this.form]);
        if (this.form.invalid) return;
        let dto = this.form.value as ToursDto;
        this.submitForm.emit(dto);
    }
    closeModal() {
        this.close.emit();
    }
}
