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
import { DestinationDto } from '../models';
import { map, tap } from 'rxjs';

@Injectable()
export class DestinationService {
    constructor(private fs: Firestore) {}
    get(id: string) {
        let docRef = doc(this.fs, 'Destinations/' + id);
        return docData(docRef, { idField: 'Id' }).pipe(
            tap(
                (x: DocumentData) =>
                    new DestinationDto(
                        x['Name'],
                        x['Description'],
                        x['Images'],
                        x['Rating'],
                        x['Discount'],
                        id
                    )
            )
        );
    }
    getAll() {
        let desCollection = collection(this.fs, 'Destinations');
        return collectionData(desCollection, { idField: 'Id' }).pipe(
            map((data: DocumentData[]) => {
                return data.map(
                    (x) =>
                        new DestinationDto(
                            x['Name'],
                            x['Description'],
                            x['Images'],
                            x['Rating'],
                            x['Discount'],
                            x['Id']
                        )
                );
            })
        );
    }
    add(destination: DestinationDto) {
        let desCollection = collection(this.fs, 'Destinations');
        return addDoc(desCollection, { ...destination });
    }
    update(id: string, destination: DestinationDto) {
        let docRef = doc(this.fs, 'Destinations/' + id);
        return updateDoc(docRef, { ...destination });
    }
    delete(id: string) {
        let docRef = doc(this.fs, 'Destinations/' + id);
        return deleteDoc(docRef);
    }
}
