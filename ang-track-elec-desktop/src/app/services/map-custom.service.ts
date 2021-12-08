import { Injectable, EventEmitter } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapCustomService {

  mapbox = (mapboxgl as typeof mapboxgl);
  map!: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 21.3559;
  lng =  -101.93399;
  zoom = 12;
  wayPoints: Array<any> = [];
  markerDriver: any = null;

  constructor() {
    this.mapbox.accessToken = environment.mapBoxToken;
  }

  buildMap(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.map = new mapboxgl.Map({
          container: 'map',
          style: this.style,
          zoom: this.zoom,
          center: [this.lng, this.lat]
        });
      } catch(err){console.log(err)}


      resolve({
        map: this.map
      });


    });
  }

  addMarkerCustom(coords: any): void {
    console.log('----->', coords)
    const el = document.createElement('div');
    el.className = 'marker';
    if (!this.markerDriver) {
      this.markerDriver = new mapboxgl.Marker(el)
          .setLngLat(coords)
          .addTo(this.map);
    } else {
      this.markerDriver
        .setLngLat(coords)
        .addTo(this.map);
    }
  }

}
