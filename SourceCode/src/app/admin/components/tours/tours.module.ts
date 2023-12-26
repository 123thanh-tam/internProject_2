import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToursComponent } from './tours.component';
import { ToursRoutes } from './tours.routing';
@NgModule({
    imports: [CommonModule, ToursRoutes],
    declarations: [ToursComponent],
})
export class ToursModule {}
