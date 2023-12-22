import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';

@Injectable()
export class DestinationService {
    constructor(private fs: Firestore) {}
    getDes() {
        let desCollection = collection(this.fs, 'destination');
        return collectionData(desCollection, { idField: 'DestinationId' });
    }
    addDes(
        desId: number,
        name: string,
        description: string,
        img: string,
        rating: number,
        discount: number
    ) {
        let data = {
            DestinationId: desId,
            Name: name,
            Description: description,
            Image: img,
            Rating: rating,
            Discount: discount,
        };
        let desCollection = collection(this.fs, 'destination');
        return addDoc(desCollection, data);
    }
    deleteDes(desId: number) {
        let docRef = doc(this.fs, 'destination/' + desId);
        return deleteDoc(docRef);
    }
}
