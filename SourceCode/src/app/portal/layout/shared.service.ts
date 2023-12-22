import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collectFromHash, guid } from '@fullcalendar/core/internal';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';

@Injectable({
    providedIn: 'root',
})
export class SharedService {
    constructor(private fs: Firestore) {}

    getGuides() {
        let guidesCollection = collection(this.fs, 'travel-guide');
        return collectionData(guidesCollection, { idField: 'GuideId' });
    }
    addGuides(guideId: number, name: string, idDes: number) {
        let data = { GuideId: guideId, Name: name, DestinationId: idDes };
        let guidesCollection = collection(this.fs, 'travel-guide');
        return addDoc(guidesCollection, data);
    }
    deleteGuide(guideId: number) {
        let docRef = doc(this.fs, 'travel-guide/' + guideId);
        return deleteDoc(docRef);
    }
}
