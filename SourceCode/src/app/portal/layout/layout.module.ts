import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent as PortalLayoutComponent } from './layout.component';
import { FooterComponent as portalFooterComponent } from './footer/footer.component';
import { HeaderComponent as PortalHeaderComponent } from './header/header.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { PackagesService } from 'src/app/_shared/services';
import { DestinationService } from 'src/app/_shared/services';
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
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        RouterOutlet,
        provideFirebaseApp(() => initializeApp(firebaseConfig)),
        provideFirestore(() => getFirestore()),
    ],
    providers: [PackagesService, DestinationService],
    declarations: [...components],
    exports: [...components],
})
export class portalLayoutModule {}
