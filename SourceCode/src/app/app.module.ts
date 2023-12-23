import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminLayoutModule } from './admin/layout/app.layout.module';
import { NotfoundComponent } from './notfound/notfound.component';
import { portalLayoutModule } from './portal/layout/layout.module';
import { AngularFireModule } from '@angular/fire/compat';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

import { environment } from 'src/environments/environment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NotificationService, UtilityService } from './_shared/services';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalHttpInterceptorService as HttpErrorInterceptorService } from './_shared/interceptors';
// import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
// import { getFirestore, provideFirestore } from '@angular/fire/firestore';


// const firebaseConfig = {
//     apiKey: 'AIzaSyBG2_fG-mgVuQPppdXZ2J4GVH7XxXV9JmQ',
//     authDomain: 'travel-data-960b4.firebaseapp.com',
//     projectId: 'travel-data-960b4',
//     storageBucket: 'travel-data-960b4.appspot.com',
//     messagingSenderId: '314394847999',
//     appId: '1:314394847999:web:5a3ace675ae4587671baca',
// };

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [
        AppRoutingModule,
        AdminLayoutModule,
        portalLayoutModule,
        AngularFireModule.initializeApp(environment.firebase),
        // provideFirebaseApp(() => initializeApp(firebaseConfig)),
        // provideFirestore(() => getFirestore()),
        ConfirmDialogModule,
        ToastModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptorService,
            multi: true,
        },
        MessageService,
        NotificationService,
        ConfirmationService,
        UtilityService
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
