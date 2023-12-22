import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminLayoutModule } from './admin/layout/app.layout.module';
import { NotfoundComponent } from './notfound/notfound.component';
import { portalLayoutModule } from './portal/layout/layout.module';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
// import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
// import { getFirestore, provideFirestore } from '@angular/fire/firestore';
// import { SharedService } from './shared.service';

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
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        // SharedService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
