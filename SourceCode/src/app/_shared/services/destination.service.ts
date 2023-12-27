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
import { CreateDestinationDto, DestinationDto, ImageDto, UpdateDestinationDto } from '../models';
import { Observable, finalize, forkJoin, from, map, tap } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MessageConstants } from '../consts';
import { NotificationService } from './notification.service';

@Injectable()
export class DestinationService {
    constructor(
        private fs: Firestore,
        private storage: AngularFireStorage,
        private notificationService: NotificationService
    ) { }
    get(id: string) {
        let docRef = doc(this.fs, 'Destinations/' + id);
        return docData(docRef, { idField: 'Id' }).pipe(
            tap((x: DocumentData) => {
                return new DestinationDto(
                    x['Code'],
                    x['Name'],
                    x['Description'],
                    x['Rating'],
                    x['Images'],
                    x['TravelGuideIdss'],
                    id
                );
            })
        );
    }
    getAll() {
        let desCollection = collection(this.fs, 'Destinations');
        return collectionData(desCollection, { idField: 'Id' }).pipe(
            map((data: DocumentData[]) => {
                return data.map((x) => {
                    return new DestinationDto(
                        x['Code'],
                        x['Name'],
                        x['Description'],
                        x['Rating'],
                        x['Images'],
                        x['TravelGuideIdss'],
                        x['Id']
                    );
                });
            })
        );
    }
    add(destination: CreateDestinationDto) {
        let desCollection = collection(this.fs, 'Destinations');
        return addDoc(desCollection, { ...destination });
    }
    update(id: string, destination: UpdateDestinationDto) {
        debugger
        let docRef = doc(this.fs, 'Destinations/' + id);
        return updateDoc(docRef, { ...destination });
    }
    delete(des: DestinationDto) {
        let pros = [];
        let docRef = doc(this.fs, 'Destinations/' + des.Id);
        let delDes = deleteDoc(docRef);
        pros.push(delDes);
        // del folder image
        if (des.Images && des.Images.length > 0) {
            for (let index = 0; index < des.Images.length; index++) {
                let filePath = `${des.Images[index].Path}`;
                let delFilder = this.storage.ref(filePath).delete();
                pros.push(pros);
            }
        }
        return Promise.all(pros);
    }

    upload(des: DestinationDto, file: File): Observable<number | undefined> {
        const filePath = `DestinationImages/${des.Id}/${file.name}`;
        const storageRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, file);

        uploadTask
            .snapshotChanges()
            .pipe(
                finalize(() => {
                    storageRef.getDownloadURL().subscribe((downloadURL) => {
                        let imageDto = new ImageDto(downloadURL, filePath, file.name, file.size);
                        if (des.Images) {
                            des.Images.push(imageDto);
                        } else {
                            des.Images = [imageDto];
                        }
                        let updateDto = {
                            Id: des.Id,
                            Code: des.Code,
                            Name: des.Name,
                            TravelGuideIdss: des.TravelGuideIdss,
                            Description: des.Description,
                            Rating: des.Rating,
                            Images: JSON.stringify(des.Images)
                        } as UpdateDestinationDto;
                        this.update(des.Id, updateDto).then((x) => {
                            this.notificationService.showSuccess(
                                MessageConstants.UPLOAD_OK_MSG
                            );
                        });
                    });
                })
            )
            .subscribe();
        return uploadTask.percentageChanges();
    }
    deleteImage(des: DestinationDto, imageDto: ImageDto): Observable<any> {

        des.Images = des.Images.filter((x) => x.Name != imageDto.Name);
        let updateDto = {
            Id: des.Id,
            Code: des.Code,
            Name: des.Name,
            Description: des.Description,
            Rating: des.Rating,
            Images: JSON.stringify(des.Images)
        } as UpdateDestinationDto;
        let update$ = from(this.update(des.Id, updateDto));
        let deleteImage$ = this.delImg(imageDto.Path);
        return forkJoin([update$, deleteImage$]);
    }
    private delImg(filePath: string) {
        return this.storage.ref(filePath).delete();
    }
}
