import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationComponent } from './destination.component';
import { DestinationRoutes } from './destination.routing';

@NgModule({
  imports: [
    CommonModule,
    DestinationRoutes
  ],
  declarations: [DestinationComponent]
})
export class DestinationModule { }
