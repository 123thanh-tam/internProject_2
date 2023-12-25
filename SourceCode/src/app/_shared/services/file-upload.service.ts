import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from '../models/file-upload.model';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }



  pushFileToStorage(basePath: string, fileUpload: FileUpload): Observable<number | undefined> {
    const filePath = `${basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(basePath, fileUpload);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  private saveFileData(basePath: string, fileUpload: FileUpload): void {
    this.db.list(basePath).push(fileUpload);
  }

  getFiles(basePath: string, numberItems: number): AngularFireList<FileUpload> {
    return this.db.list(basePath, ref =>
      ref.limitToLast(numberItems));
  }

  deleteFile(basePath: string, fileUpload: FileUpload): void {
    this.deleteFileDatabase(basePath, fileUpload.key)
      .then(() => {
        this.deleteFileStorage(basePath, fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(basePath: string, key: string): Promise<void> {
    return this.db.list(basePath).remove(key);
  }

  private deleteFileStorage(basePath: string, name: string): void {
    const storageRef = this.storage.ref(basePath);
    storageRef.child(name).delete();
  }
}
