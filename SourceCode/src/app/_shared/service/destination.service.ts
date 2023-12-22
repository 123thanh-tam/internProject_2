import { Injectable } from '@angular/core';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Destination } from '../model';

@Injectable()
export class DestinationService {
    constructor(private fs: Firestore) { }
    get(id: string) {
        let docRef = doc(this.fs, 'destination/' + id);
        return docData(docRef, { idField: 'DestinationId' });
    }
    getAll() {
        let desCollection = collection(this.fs, 'destination');
        return collectionData(desCollection, { idField: 'Id' });
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
