import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegRouteService {

  constructor(private afs: AngularFirestore) { }

  newRouteCoords(id: string, lat: number, long: number, routeName: string): Promise<any> {
    return this.afs.collection('/routes').doc('TacoBus').collection('/'+ routeName).doc(id)
      .set({
        lat: lat,
        long: long
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


}
