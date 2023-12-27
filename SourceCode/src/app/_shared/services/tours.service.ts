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
import { ToursDto } from '../models/tours';
import { UtilityService } from './utility.service';
@Injectable({
    providedIn: 'root',
})
export class ToursService {
    constructor(private fs: Firestore,
        private utilityService: UtilityService) { }
    get(id: string) {
        let docRef = doc(this.fs, 'tours/' + id);
        return docData(docRef, { idField: 'Id' }).pipe(
            tap(
                (x: DocumentData) =>
                    new ToursDto(
                        x['CustomerId'],
                        x['DestinationId'],
                        x['PackageId'],
                        x['GuideId'],
                        x['Price'],
                        x['Discount'],
                        this.utilityService.convertTimestampToDate(
                            x['StartDate']
                        ),
                        x['Description'],
                        x['Id'],
                    )
            )
        );
    }
    getAll() {
        let toursCollection = collection(this.fs, 'tours');
        return collectionData(toursCollection, { idField: 'Id' }).pipe(
            map((data: DocumentData[]) => {
                return data.map(
                    (x) =>
                        new ToursDto(
                            x['CustomerId'],
                            x['DestinationId'],
                            x['PackageId'],
                            x['GuideId'],
                            x['Price'],
                            x['Discount'],
                            this.utilityService.convertTimestampToDate(
                                x['StartDate']
                            ),
                            x['Description'],
                            x['Id'],
                        )
                );
            })
        );
    }
    add(data: ToursDto) {
        let toursCollection = collection(this.fs, 'tours');
        return addDoc(toursCollection, { ...data });
    }
    update(id: string, data: ToursDto) {
        let docRef = doc(this.fs, 'tours/' + id);
        return updateDoc(docRef, { ...data });
    }
    delete(id: string) {
        let docRef = doc(this.fs, 'tours/' + id);
        return deleteDoc(docRef);
    }
}
