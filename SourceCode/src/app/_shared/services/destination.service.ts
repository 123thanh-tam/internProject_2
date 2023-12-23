import { Injectable } from '@angular/core';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { DocumentData, addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Destination } from '../models';
import { map, tap } from 'rxjs';

@Injectable()
export class DestinationService {
    constructor(private fs: Firestore) { }
    get(id: string) {
        let docRef = doc(this.fs, 'destination/' + id);
        return docData(docRef, { idField: 'Id' })
            .pipe(tap((x: DocumentData) =>
                new Destination(
                    x['Name'],
                    x['Description'],
                    x['Images'],
                    x['Rating'],
                    x['Discount'],
                    id
                )
            ));
    }
    getAll() {
        let desCollection = collection(this.fs, 'destination');
        return collectionData(desCollection, { idField: 'Id' })
            .pipe(map((data: DocumentData[]) => {
                return data.map(x => new Destination(
                    x['Name'],
                    x['Description'],
                    x['Images'],
                    x['Rating'],
                    x['Discount'],
                    x['Id']
                ));
            }));
    }
    add(destination: Destination) {
        let desCollection = collection(this.fs, 'destination');
        return addDoc(desCollection, { ...destination });
    }
    update(id: string, destination: Destination) {
        let docRef = doc(this.fs, 'destination/' + id);
        return updateDoc(docRef, { ...destination });
    }
    delete(id: string) {
        let docRef = doc(this.fs, 'destination/' + id);
        return deleteDoc(docRef);
    }
}
