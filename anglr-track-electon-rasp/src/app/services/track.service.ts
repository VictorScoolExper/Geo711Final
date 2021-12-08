import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  idUser: any;
  company: any;


  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.afAuth.currentUser.then((result)=>{
      this.idUser = result?.uid;
      console.log(this.idUser);
    }).then(()=>{
        this.getDriverInfo().subscribe(element => {
          this.company = element.payload.data().company;
          console.log(this.company);
        });
    });; 

  }



  saveBusLocation(lat: number, long: number, busId: string): Promise<any> {
    return this.afs.collection('/bus').doc(this.company).collection('/busList').doc(busId)
      .set({
        lat: lat,
        lng: long,
        name: "Ruta1"
      })
      .then(()=>{
        console.log("inserted corretly.")
      })
      .catch(error => {
        console.log('newCoord save error...');
        console.log('error code', error.code);
        console.log('error', error);
      })
  }
 
  

  getBusList(): Observable<any>{
    return this.afs.collection('/bus').doc(this.company).collection('/busList').snapshotChanges();
  }

  getDriverInfo(): Observable<any>{
    return this.afs.collection('/drivers').doc(this.idUser).snapshotChanges();
  }
}
