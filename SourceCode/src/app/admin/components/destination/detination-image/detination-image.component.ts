import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DestinationDto } from 'src/app/_shared/models';
import { FileUploadService } from 'src/app/_shared/services';

@Component({
  selector: 'app-detination-image',
  templateUrl: './detination-image.component.html',
  styleUrls: ['./detination-image.component.scss']
})
export class DetinationImageComponent implements OnInit {

  @Input() item: DestinationDto | undefined;

  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() close: EventEmitter<any> = new EventEmitter();

  files: File[];
  constructor(private fileUploadService: FileUploadService) {
  }

  ngOnInit() {
  }
  choseFile(event) {
    this.files = event.files;
  }
  removeFile(event) {
    this.files = null;
  }
}
