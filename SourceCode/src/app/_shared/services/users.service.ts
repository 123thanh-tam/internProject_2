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
import { Observable, finalize, map, tap } from 'rxjs';
// import { dc } from '@fullcalendar/core/internal-common';
import { UtilityService } from './utility.service';
import { CreateUsersDto, ImageDto, UpdateUsersDto, UsersDto } from '../models';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NotificationService } from './notification.service';
import { MessageConstants } from '../consts';
@Injectable({
    providedIn: 'root',
})
export class UsersService {
    constructor(
        private fs: Firestore,
        private utilityService: UtilityService,
        private storage: AngularFireStorage,
        private notificationService: NotificationService
    ) { }
    get(id: string) {
        let docRef = doc(this.fs, 'Users/' + id);
        return docData(docRef, { idField: 'Id' }).pipe(
            tap(
                (x: DocumentData) =>
                    new UsersDto(
                        x['UserName'],
                        x['Name'],
                        x['Password'],
                        x['Kind'],
                        x['Email'],
                        x['Phone'],
                        x['Avatar'],
                        x['Id'],
                    )
            )
        );
    }
    getAll() {
        let usersCollection = collection(this.fs, 'Users');
        return collectionData(usersCollection, { idField: 'Id' }).pipe(
            map((data: DocumentData[]) => {
                return data.map(
                    (x) =>
                        new UsersDto(
                            x['UserName'],
                            x['Name'],
                            x['Password'],
                            x['Kind'],
                            x['Email'],
                            x['Phone'],
                            x['Avatar'],
                            x['Id'],
                        )
                );
            })
        );
    }
    add(data: CreateUsersDto) {
        let usersCollection = collection(this.fs, 'Users');
        return addDoc(usersCollection, { ...data });
    }
    update(id: string, data: UpdateUsersDto) {
        let docRef = doc(this.fs, 'Users/' + id);
        return updateDoc(docRef, { ...data });
    }
    delete(user: UsersDto) {
        let pros = [];
        let docRef = doc(this.fs, 'Users/' + user.Id);
        let delDes = deleteDoc(docRef);
        pros.push(delDes);
        if (user.Avatar) {
            let delFilder = this.storage.ref(user.Avatar.Path).delete();
            pros.push(pros);
        }
        return Promise.all(pros);
    }
    upload(user: UsersDto, file: File): Observable<number | undefined> {
        const filePath = `Avatars/${user.Id}`;
        const storageRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, file);

        uploadTask
            .snapshotChanges()
            .pipe(
                finalize(() => {
                    storageRef.getDownloadURL().subscribe((downloadURL) => {
                        user.Avatar = new ImageDto(downloadURL, filePath, file.name, file.size);

                        let updateDto = {
                            Id: user.Id,
                            Name: user.Name,
                            Password: user.Password,
                            Kind: user.Kind,
                            Email: user.Email,
                            Phone: user.Phone,
                            Avatar: JSON.stringify(user.Avatar)
                        } as UpdateUsersDto;
                        this.update(user.Id, updateDto).then((x) => {
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
}
