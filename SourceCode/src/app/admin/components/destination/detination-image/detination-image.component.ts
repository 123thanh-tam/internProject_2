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
    percentage = 0;
    iamageUrls = [];

    constructor(
        private destinationService: DestinationService,
        private notificationService: NotificationService
    ) { }

    ngOnInit() {
        console.log(this.item.Images);
    }

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

    formatBytes(bytes, decimals = 2) {
        if (!+bytes) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    }


}
