import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICE } from '../config/config';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { Request } from '../models/request.model';
import { WebSocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor(
    private http: HttpClient,
    public wsSertvice: WebSocketService
  ) { }

  getAllRequest(id){
    let token = localStorage.getItem('tokenBT');
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        token
    });

    const url = URL_SERVICE.url + '/request/sucursal/' + id;
    return this.http.get(url, { headers })
        .pipe(map((data: any) => {
          return data.request;
        }));
  }

  getRequestPendiente(id){
    let token = localStorage.getItem('tokenBT');
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        token
    });

    const url = URL_SERVICE.url + '/request/sucursal/pendiente/' + id;
    return this.http.get(url, { headers })
        .pipe(map((data: any) => {
          return data.request;
        }));
  }

  getDetailRequest(idReq){
    let token = localStorage.getItem('tokenBT');
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        token
    });

    const url = URL_SERVICE.url + '/requestDetail/' + idReq;
    return this.http.get(url, { headers })
        .pipe(map((data: any) => {
          return data.requestDetail;
        }));
  }

  getSolicitudWS(){
    // const sucursal = JSON.parse(localStorage.getItem("sucursalBT"));
    // const idSucursal = sucursal['_id'];
    return this.wsSertvice.listen('sendSolicitud').subscribe(msg => {
      console.log(msg);
      console.log("si llega algo 22?");
    });
  }

  setSolicitud(){
    const sucursal = JSON.parse(localStorage.getItem("sucursalBT"));
    const idSucursal = sucursal['_id'];

    this.wsSertvice.emit('getSolicitud', idSucursal);
  }

  changeStatus(id: string, estado: string, commentA){
    let token = localStorage.getItem('tokenBT');
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        token
    });

    let body = {
      status: estado,
      comment: commentA
    }

    const url = URL_SERVICE.url + '/request/' + id;
    
    return this.http.put(url, body, { headers })
        .pipe(map((data: any) => {
          return data.request;
        }));
  }
}
