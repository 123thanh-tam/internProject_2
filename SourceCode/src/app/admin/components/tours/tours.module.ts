import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToursComponent } from './tours.component';
import { ToursRoutes } from './tours.routing';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { ValidationMessagedModule } from 'src/app/_shared/components';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ToursDetailComponent } from './tours-detail/tours-detail.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { ImageModule } from 'primeng/image';
import { CalendarModule } from 'primeng/calendar';
@NgModule({
    imports: [
        CommonModule,
        ToursRoutes,
        ValidationMessagedModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        TableModule,
        PanelModule,
        TagModule,
        RatingModule,
        InputTextModule,
        TooltipModule,
        FileUploadModule,
        InputTextareaModule,
        InputNumberModule,
        DialogModule,
        DropdownModule,
        ProgressBarModule,
        ImageModule,
        DropdownModule,
        CalendarModule
    ],
    declarations: [ToursComponent, ToursDetailComponent],
})
export class ToursModule { }
