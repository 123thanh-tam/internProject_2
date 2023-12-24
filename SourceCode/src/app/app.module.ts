import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminLayoutModule } from './admin/layout/app.layout.module';
import { NotfoundComponent } from './notfound/notfound.component';
import { portalLayoutModule } from './portal/layout/layout.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
//@angular/fire
import { AngularFireModule } from '@angular/fire/compat';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore, connectFirestoreEmulator } from '@angular/fire/firestore';
import { provideStorage, getStorage, connectStorageEmulator } from '@angular/fire/storage';

import { environment } from 'src/environments/environment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileUploadService, NotificationService, UtilityService } from './_shared/services';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptorService } from './_shared/interceptors';

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [
        AppRoutingModule,
        AdminLayoutModule,
        portalLayoutModule,
        ConfirmDialogModule,
        ToastModule,
        AngularFireModule.initializeApp(environment.firebase),
        // provideFirebaseApp(() => {
        //     return initializeApp(environment.firebase);
        // }),
        // provideFirestore(() => {
        //     const firestore = getFirestore();
        //     if (location.hostname === 'localhost') {
        //         connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
        //     }
        //     return firestore;
        // }),
        provideStorage(() => {
            const storage = getStorage();
            if (location.hostname === 'localhost') {
                connectStorageEmulator(storage, '127.0.0.1', 5001);
            }
            return storage;
        }),

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
        UtilityService,
        FileUploadService
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
