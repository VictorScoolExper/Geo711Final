import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  idUser: any;
  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) { 
    this.afAuth.currentUser.then((result:any)=>{
      this.idUser = result?.uid;
      console.log(this.idUser);
    });
  }

  obtenerCoords(): Observable<any>{
    return this.afs.collection('/bus').doc(this.idUser).collection('/busList').snapshotChanges();
  }
}
