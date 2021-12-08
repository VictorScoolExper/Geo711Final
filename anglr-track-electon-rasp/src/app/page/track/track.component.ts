import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TrackService } from 'src/app/services/track.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {

  interval: any;
  isProgressVisible: boolean;
  isProgressConeFire: boolean;
  isFinish: boolean;

  listLagos = [
    {lat: 21.33572233643457, long: -101.9634828910994},
    {lat: 21.335162697660902, long: -101.96296790697019},
    {lat: 21.335882232834884, long: -101.96013549425957},
    {lat: 21.336122077108534, long: -101.95850471118378},
    {lat: 21.336441868863375, long: -101.95687392810797},
    {lat: 21.33724134520013,long:  -101.95498565296755},
    {lat: 21.338440551534607, long: -101.95163825612774},
    {lat: 21.33955980193363, long: -101.94906333548174},
    {lat: 21.341718332152457, long: -101.94588760001831},
    {lat: 21.34275761314832,long: -101.9441709862543},
    {lat: 21.343397167023056,long: -101.94331267937231},
    {lat: 21.343956774375133,long: -101.9424543724903},
    {lat: 21.34531581190959,long: -101.9409952507909},
    {lat: 21.349392848925206,long: -101.9406519280381},
    {lat: 21.349632671100846, long: -101.9409952507909},
    {lat: 21.353389833956765, long:-101.94082358941449},
    {lat: 21.357706455352055, long:-101.94048026666168}

  ];

  count: number = 0;
  router: any;
  busId: string = '';
  name: string = '';
  lastName: string ='';
  routeName: string = '';
  listBus: any;

  constructor(private trackServ: TrackService ) {
    this.isProgressVisible = false;
    this.isFinish = false;
    this.isProgressConeFire = true;
   }


  ngOnInit(): void {
    this.saveDriverInfo();
    
  }

  ngOnDestroy(){
    
  }

  addCoords(){
    if(this.count === 17){
      this.count = 0;
    }
    this.count += 1;  
    this.trackServ.saveBusLocation(this.listLagos[this.count].lat, this.listLagos[this.count].long, this.busId);
    //console.log("==="+this.listLagos[this.count].lat+"===="+this.listLagos[this.count].long)
  }

  startTracking(){
    this.isProgressVisible = true;
    this.interval = setInterval(()=> {
      console.log("hello from create function");
      this.addCoords();
      
    }, 2500);

  }

  stop(){
    this.isProgressVisible = false;
    clearInterval(this.interval);
    console.log("stopped");
  }

  goHome(){
    this.router.navigate(['/home']);
  }

  i: any;
  saveDriverInfo() {
    this.trackServ.getDriverInfo().subscribe(element => {
      
      this.name = element.payload.data().name;
      this.lastName = element.payload.data().lastName;
      this.busId = element.payload.data().busId;
      this.routeName = element.payload.data().routeName;
      console.log(element.payload.data().busId);
      
      this.isFinish = true;
      this.isProgressConeFire = false;
    })
    
  }

}


