import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageConstants, eUserKind } from 'src/app/_shared/consts';
import { DestinationService, UtilityService } from 'src/app/_shared/services';
// import { PackagesDto as PackagesDto } from 'src/app/_shared/models/packages';
import { ToursDto } from 'src/app/_shared/models/tours';
import { DestinationDto, DropDownItem, PackagesDto, UsersDto } from 'src/app/_shared/models';
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
    @Input() destinations: DestinationDto[] = [];
    @Input() users: UsersDto[] = [];
    @Input() packages: PackagesDto[] = [];

    @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
    @Output() close: EventEmitter<any> = new EventEmitter();

    form: FormGroup;
    title: string;

    customerOptions: DropDownItem[] = [];
    destinationOptions: DropDownItem[] = [];
    packageOptions: DropDownItem[] = [];
    guidesOptions: DropDownItem[] = [];

    validationMessages = {
        CustomerId: [
            { type: 'required', message: MessageConstants.REQUIRED_ERROR_MSG },
        ],
        StartDate: [
            { type: 'required', message: MessageConstants.REQUIRED_ERROR_MSG },
        ],
        DestinationId: [
            { type: 'required', message: MessageConstants.REQUIRED_ERROR_MSG },
        ],
        GuideId: [
            { type: 'required', message: MessageConstants.REQUIRED_ERROR_MSG },
        ],
        PackageId: [
            { type: 'required', message: MessageConstants.REQUIRED_ERROR_MSG },
        ],
        Price: [
            { type: 'required', message: MessageConstants.REQUIRED_ERROR_MSG },
        ],
        Description: [
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
        private toursService: ToursService,
        private destinationsService: DestinationService,
        private usersService: UsersService,
        private packagesService: PackagesService
    ) { }

    ngOnInit() {
        this.buildForm();
        this.setOptions();
    }
    setOptions() {
        this.users.forEach(u => {
            if (u.Kind == eUserKind.Customer) {
                this.customerOptions.push(new DropDownItem(u.Name, u.Id));
            }
        });
        this.destinations.forEach(d => {
            this.destinationOptions.push(new DropDownItem(d.Name, d.Id));
        });
    }

    changeDestination() {
        let desId = this.form.get('DestinationId').value;

        // reset fpr, cpmtrpl
        this.form.get('GuideId').reset();
        this.form.get('PackageId').reset();
        this.form.get('Price').reset();
        this.form.get('Discount').reset();

        this.packageOptions = this.packages
            .filter(x => x.DestinationId == desId)
            .map(p => new DropDownItem(p.Name, p.Id));

        // destination has many guide
        let activeGuides = this.destinations.find(d => d.Id == desId).TravelGuideIdss;
        this.guidesOptions = this.users
            .filter(x => activeGuides.includes(x.Id))
            .map(p => new DropDownItem(p.Name, p.Id));
    }
    changePackage() {
        let packId = this.form.get('PackageId').value;
        let pack = this.findPack(packId);
        this.form.get('Price').setValue(pack.Price);
        this.form.get('Discount').setValue(pack.Discount);
    }

    buildForm() {
        this.form = this.fb.group({
            Id: [null],
            CustomerId: [null, Validators.required],
            StartDate: [null, Validators.required],
            DestinationId: [null, Validators.required],
            GuideId: [null, Validators.required],
            PackageId: [null, Validators.required],
            Price: [null, Validators.required],
            Discount: [null],
            Description: [null, [Validators.maxLength(100)]],
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

