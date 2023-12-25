import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutes } from './user.routing';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { ValidationMessagedModule } from 'src/app/_shared/components';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { UsersDetailComponent } from './users-detail/users-detail.component';
@NgModule({
    imports: [
        CommonModule,
        UserRoutes,
        ValidationMessagedModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        TableModule,
        PanelModule,
        TagModule,
        InputTextModule,
        TooltipModule,
        FileUploadModule,
        InputTextareaModule,
        InputNumberModule,
        DialogModule,
        DropdownModule,
    ],
    declarations: [UserComponent, UsersDetailComponent],
})
export class UserModule {}
