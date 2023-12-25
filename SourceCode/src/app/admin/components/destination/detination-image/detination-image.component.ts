import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map } from 'rxjs';
import { MessageConstants } from 'src/app/_shared/consts';
import { DestinationDto, FileUpload, ImageDto } from 'src/app/_shared/models';
import {
    DestinationService,
    FileUploadService,
    NotificationService,
} from 'src/app/_shared/services';

@Component({
    selector: 'app-detination-image',
    templateUrl: './detination-image.component.html',
    styleUrls: ['./detination-image.component.scss'],
})
export class DetinationImageComponent implements OnInit {
    @Input() item!: DestinationDto | undefined;

    files: File[];
    fileUploads?: any[];

    selectedFiles?: FileList;
    currentFileUpload?: FileUpload;
    percentage = 0;
    iamageUrls = [];

    constructor(
        private destinationService: DestinationService,
        private notificationService: NotificationService
    ) {}

    ngOnInit() {}

    selectFile(event: any): void {
        this.selectedFiles = event.target.files;
    }

    upload(): void {
        if (this.selectedFiles) {
            const file: File | null = this.selectedFiles.item(0);
            this.selectedFiles = undefined;

            if (file) {
                this.destinationService.upload(this.item, file).subscribe(
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
    delete(image: ImageDto): void {
        this.destinationService.deleteImage(this.item, image).subscribe((x) => {
            this.notificationService.showSuccess(
                MessageConstants.DELETED_OK_MSG
            );
        });
    }
}
