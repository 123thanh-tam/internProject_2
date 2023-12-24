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
import { PackagesDto } from '../models/packages';
import { dc } from '@fullcalendar/core/internal-common';
@Injectable({
    providedIn: 'root',
})
export class PackagesService {
    constructor(private fs: Firestore) {}
    get(id: string) {
        let docRef = doc(this.fs, 'packages/' + id);
        return docData(docRef, { idField: 'Id' }).pipe(
            tap(
                (x: DocumentData) =>
                    new PackagesDto(
                        x['PackagesId'],
                        x['DestinationId'],
                        x['StartDate'],
                        x['EndDate'],
                        x['People'],
                        x['Price'],
                        x['Images']
                    )
            )
        );
    }
    getAll() {
        let pacCollection = collection(this.fs, 'packages');
        return collectionData(pacCollection, { idField: 'Id' }).pipe(
            map((data: DocumentData[]) => {
                return data.map(
                    (x) =>
                        new PackagesDto(
                            x['PackagesId'],
                            x['DestinationId'],
                            x['StartDate'],
                            x['EndDate'],
                            x['People'],
                            x['Price'],
                            x['Images']
                        )
                );
            })
        );
    }
    add(destination: PackagesDto) {
        let pacCollection = collection(this.fs, 'packages');
        return addDoc(pacCollection, { ...destination });
    }
    update(id: string, destination: PackagesDto) {
        let docRef = doc(this.fs, 'packages/' + id);
        return updateDoc(docRef, { ...destination });
    }
    delete(id: string) {
        let docRef = doc(this.fs, 'packages/' + id);
        return deleteDoc(docRef);
    }
}
