import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationComponent } from './destination.component';
import { DestinationRoutes } from './destination.routing';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { ValidationMessagedModule } from 'src/app/_shared/components';
import { DestinationDetailComponent } from './destination-detail/destination-detail.component';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { DetinationImageComponent } from './detination-image/detination-image.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { ImageModule } from 'primeng/image';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  imports: [
    DestinationRoutes,
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
    ProgressBarModule,
    ImageModule,
    MultiSelectModule
  ],
  declarations: [
    DestinationComponent,
    DestinationDetailComponent,
    DetinationImageComponent
  ]
})
export class DestinationModule { }
