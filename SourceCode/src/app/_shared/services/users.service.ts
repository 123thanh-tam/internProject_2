import { Injectable } from '@angular/core';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import {
    DocumentData,
    addDoc,
    collection,
    deleteDoc,
    doc,
    updateDoc,
} from 'firebase/firestore';
import { map, tap } from 'rxjs';
// import { dc } from '@fullcalendar/core/internal-common';
import { UtilityService } from './utility.service';
import { UsersDto } from '../models';
@Injectable({
    providedIn: 'root',
})
export class UsersService {
    constructor(
        private fs: Firestore,
        private utilityService: UtilityService
    ) {}
    get(id: string) {
        let docRef = doc(this.fs, 'users/' + id);
        return docData(docRef, { idField: 'Id' }).pipe(
            tap(
                (x: DocumentData) =>
                    new UsersDto(
                        x['Id'],
                        x['Name'],
                        x['Kind'],
                        x['Email'],
                        x['Phone']
                    )
            )
        );
    }
    getAll() {
        let usersCollection = collection(this.fs, 'users');
        return collectionData(usersCollection, { idField: 'Id' }).pipe(
            map((data: DocumentData[]) => {
                return data.map(
                    (x) =>
                        new UsersDto(
                            x['Id'],
                            x['Name'],
                            x['Kind'],
                            x['Email'],
                            x['Phone']
                        )
                );
            })
        );
    }
    add(data: UsersDto) {
        let usersCollection = collection(this.fs, 'users');
        return addDoc(usersCollection, { ...data });
    }
    update(id: string, data: UsersDto) {
        let docRef = doc(this.fs, 'users/' + id);
        return updateDoc(docRef, { ...data });
    }
    delete(id: string) {
        let docRef = doc(this.fs, 'users/' + id);
        return deleteDoc(docRef);
    }
}
