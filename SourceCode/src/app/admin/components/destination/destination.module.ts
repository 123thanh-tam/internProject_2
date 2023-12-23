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

@NgModule({
  imports: [
    CommonModule,
    DestinationRoutes,
    ButtonModule,
    TableModule,
    PanelModule,
    TagModule,
    RatingModule,
    InputTextModule,
    TooltipModule 
  ],
  declarations: [DestinationComponent]
})
export class DestinationModule { }
