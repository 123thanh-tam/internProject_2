import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackagesComponent } from './packages.component';
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
import { PackagesRoutes } from './packages.routing';
import { PackagesDetailComponent } from './packages-detail/packages-detail.component';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
    imports: [
        PackagesRoutes,
        CommonModule,
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
        CalendarModule,
        DropdownModule,
        MultiSelectModule
    ],
    declarations: [PackagesComponent, PackagesDetailComponent],
})
export class PackagesModule {}
