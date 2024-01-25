import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceWorkerService {

  constructor(private swPush: SwPush, private http: HttpClient){
  }

  pushToActivate(){
    this.swPush.requestSubscription({
      serverPublicKey: "BEiao96Q1unFcE6ZWo-ninSPZv_uwvcNfIJcHkBzzctBHyeV_qehnYEl6cKUis90Reu6HeY-iL9HncSpyp4eP6g"
    })
    .then(sub => {
      //send sub to the server
      this.http.post("https://localhost:3000/subscribe", sub).subscribe((res: any)=>
      console.log(res));
    })
    .catch(error => {
      console.error(error);
    })
  }
}
