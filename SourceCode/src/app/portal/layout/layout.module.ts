import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent as PortalLayoutComponent } from './layout.component';
import { FooterComponent as portalFooterComponent } from './footer/footer.component';
import { HeaderComponent as PortalHeaderComponent } from './header/header.component';
import { TouristComponent } from './tourist/tourist.component';
import { RouterOutlet } from '@angular/router';

const components = [
  PortalLayoutComponent,
  portalFooterComponent,
  PortalHeaderComponent,
  TouristComponent,
];

@NgModule({
  imports: [CommonModule, RouterOutlet],
  declarations: [...components],
  exports: [...components],
})
export class portalLayoutModule { }
