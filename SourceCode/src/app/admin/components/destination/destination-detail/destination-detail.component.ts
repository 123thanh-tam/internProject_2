import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageConstants } from 'src/app/_shared/consts';
import { DestinationDto as DestinationDto } from 'src/app/_shared/models';
import { UtilityService } from 'src/app/_shared/services';

@Component({
  selector: 'app-destination-detail',
  templateUrl: './destination-detail.component.html',
  styleUrls: ['./destination-detail.component.scss']
})
export class DestinationDetailComponent implements OnInit {

  @Input() mode: 'create' | 'update' | 'view' = 'view';
  @Input() id: string | undefined;
  @Input() item: DestinationDto | undefined;

  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() close: EventEmitter<any> = new EventEmitter();

  form: FormGroup;
  title: string;
  files: File[];

  validationMessages = {
    Name: [
      { type: 'required', message: MessageConstants.REQUIRED_ERROR_MSG },
      {
        type: 'maxlength',
        message: `Tên không quá 100 ký tự`,
      },
    ],
    Description: [
      { type: 'required', message: MessageConstants.REQUIRED_ERROR_MSG },
      {
        type: 'maxlength',
        message: `Mô tả không quá 100 ký tự`,
      },
    ],
  };

  get formControls() {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private utilService: UtilityService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      Id: [null],
      Name: [
        null,
        [Validators.required, Validators.maxLength(100)],
      ],
      Description: [
        null,
        [Validators.required, Validators.maxLength(100)],
      ],
      Rating: [null],
      Discount: [null],
      Images: [null],
    });
    if (this.item)
      this.form.patchValue(this.item);
    if(this.mode == 'view') this.form.disable();
  }
  saveChange() {
    this.utilService.markAllControlsAsDirty([this.form]);
    if (this.form.invalid) return;
    let dto = this.form.value as DestinationDto;
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
