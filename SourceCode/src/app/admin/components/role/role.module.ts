import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { RoleRoutes } from './role.routing';

@NgModule({
  imports: [
    CommonModule,
    RoleRoutes
  ],
  declarations: [RoleComponent]
})
export class RoleModule { }
