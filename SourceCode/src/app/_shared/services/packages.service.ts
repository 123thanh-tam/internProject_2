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
import { UtilityService } from './utility.service';
@Injectable({
    providedIn: 'root',
})
export class PackagesService {
    constructor(
        private fs: Firestore,
        private utilityService: UtilityService
    ) {}
    get(id: string) {
        let docRef = doc(this.fs, 'Packages/' + id);
        return docData(docRef, { idField: 'Id' }).pipe(
            tap(
                (x: DocumentData) =>
                    new PackagesDto(
                        x['Code'],
                        x['Name'],
                        x['DestinationId'],
                        x['DateCount'],
                        x['People'],
                        x['Price'],
                        x['Discount'],
                        x['Id']
                    )
            )
        );
    }
    getAll() {
        let pacCollection = collection(this.fs, 'Packages');
        return collectionData(pacCollection, { idField: 'Id' }).pipe(
            map((data: DocumentData[]) => {
                return data.map(
                    (x) =>
                        new PackagesDto(
                            x['Code'],
                            x['Name'],
                            x['DestinationId'],
                            x['DateCount'],
                            x['People'],
                            x['Price'],
                            x['Discount'],
                            x['Id']
                        )
                );
            })
        );
    }
    add(data: PackagesDto) {
        let pacCollection = collection(this.fs, 'Packages');
        return addDoc(pacCollection, { ...data });
    }
    update(id: string, data: PackagesDto) {
        let docRef = doc(this.fs, 'Packages/' + id);
        return updateDoc(docRef, { ...data });
    }
    delete(id: string) {
        let docRef = doc(this.fs, 'Packages/' + id);
        return deleteDoc(docRef);
    }
}
