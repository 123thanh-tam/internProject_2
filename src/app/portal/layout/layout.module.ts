import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent as PortalLayoutComponent } from './layout.component';
import { FooterComponent as portalFooterComponent } from './footer/footer.component';
import { HeaderComponent as PortalHeaderComponent } from './header/header.component';
import { TouristComponent } from './tourist/tourist.component';
import { RouterOutlet } from '@angular/router';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { SharedService } from 'src/app/portal/layout/shared.service';
import { DestinationService } from 'src/app/_shared/service/destination.service';
const firebaseConfig = {
    apiKey: 'AIzaSyBG2_fG-mgVuQPppdXZ2J4GVH7XxXV9JmQ',
    authDomain: 'travel-data-960b4.firebaseapp.com',
    projectId: 'travel-data-960b4',
    storageBucket: 'travel-data-960b4.appspot.com',
    messagingSenderId: '314394847999',
    appId: '1:314394847999:web:5a3ace675ae4587671baca',
};
const components = [
    PortalLayoutComponent,
    portalFooterComponent,
    PortalHeaderComponent,
    TouristComponent,
];

@NgModule({
    imports: [
        CommonModule,
        RouterOutlet,
        provideFirebaseApp(() => initializeApp(firebaseConfig)),
        provideFirestore(() => getFirestore()),
    ],
    providers: [SharedService, DestinationService],
    declarations: [...components],
    exports: [...components],
})
export class portalLayoutModule {}
