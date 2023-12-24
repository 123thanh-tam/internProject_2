import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageConstants } from 'src/app/_shared/consts';
import { UtilityService } from 'src/app/_shared/services';
import { PackagesDto as PackagesDto } from 'src/app/_shared/models/packages';
// import { Calendar } from 'primeng/calendar';
@Component({
    selector: 'app-packages-detail',
    templateUrl: './packages-detail.component.html',
    styleUrls: ['./packages-detail.component.css'],
})
export class PackagesDetailComponent implements OnInit {
    @Input() mode: 'create' | 'update' | 'view' = 'view';
    @Input() id: string | undefined;
    @Input() item: PackagesDto | undefined;

    @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
    @Output() close: EventEmitter<any> = new EventEmitter();

    form: FormGroup;
    title: string;
    files: File[];

    validationMessages = {
        PacId: [
            {
                type: 'required',
                message: MessageConstants.REQUIRED_ERROR_MSG,
            },
        ],
        Price: [
            {
                type: 'required',
                message: MessageConstants.REQUIRED_ERROR_MSG,
            },
        ],
    };

    get formControls() {
        return this.form.controls;
    }

    constructor(private fb: FormBuilder, private utilService: UtilityService) {}

    ngOnInit() {
        this.buildForm();
    }

    buildForm() {
        this.form = this.fb.group({
            PackagesId: [null, [Validators.required]],
            DestinationId: [null, Validators.required],
            StartDate: [null],
            EndDate: [null],
            People: [null],
            Price: [null, Validators.required],
            Images: [null],
        });
        if (this.item) this.form.patchValue(this.item);
        if (this.mode == 'view') this.form.disable();
    }
    saveChange() {
        this.utilService.markAllControlsAsDirty([this.form]);
        if (this.form.invalid) return;
        let dto = this.form.value as PackagesDto;
        // if (this.files && this.files.length > 0) {
        //   dto.contentLength = this.files.map(x => x.name);
        // }
        this.submitForm.emit(dto);
    }

    choseFile(event) {
        this.files = event.files[0];
    }
    removeFile(event) {
        this.files = null;
    }
    closeModal() {
        this.close.emit();
    }
}
