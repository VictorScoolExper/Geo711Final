import { Component, OnInit } from '@angular/core';
import {MapCustomService} from '../../services/map-custom.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AnimationStyleMetadata } from '@angular/animations';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  idUser: any;

  coords: any;

  listBus: any;

  constructor(private mapCustomService: MapCustomService,  private fs: FirestoreService,private afs: AngularFirestore, private afAuth: AngularFireAuth) {}

  ngOnInit(): void {
    this.mapCustomService.buildMap();
    
    this.showCoords();
  }

  logout(): void {
    this.afAuth.signOut();
  }
  
  showCoords() {
    this.fs.obtenerCoords().subscribe(doc => {
      this.listBus = [];
      doc.forEach((element: any)=>{
        console.log('hello from show Coords');
        this.listBus.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
        //console.log(element.payload.doc.id);
        //console.log(element.payload.doc.data());

      })
      //console.log(this.listBus[0].lat);
      this.viewRouteLoca(0);
    });
  }

  viewRouteLoca(i: number):void {
    this.mapCustomService.addMarkerCustom([this.listBus[i].lng, this.listBus[i].lat]);
  }


}
//21.35419670735552, -101.94419244084627