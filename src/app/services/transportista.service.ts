import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICE } from '../config/config';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { Carrier } from '../models/carrier.model';

@Injectable({
  providedIn: 'root'
})
export class TransService {
  
  constructor(
    private http: HttpClient
  ) { }

    addTrans(carrier: Carrier){
        let token = localStorage.getItem('tokenBT');

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            token
        });

        const url = URL_SERVICE.url + '/carrier';

        return this.http.post(url, carrier, { headers }).pipe(map((data: any) => data));
    }

    getTrans(id){
      let token = localStorage.getItem('tokenBT');
      const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          token
      });

      const url = URL_SERVICE.url + '/carrier/' + id;
      return this.http.get(url, { headers })
          .pipe(map((data: any) => {
            return data.carrier;
          }));
    }

    deleteTrans(id){

      let token = localStorage.getItem('tokenBT');
      const headers = new HttpHeaders({
          // 'Content-Type': 'application/json',
          token
      });

      const url = URL_SERVICE.url + '/carrier/' + id;

      return this.http.delete(url, { headers }).pipe(map((data: any) => data));
    }

    habilitaTrans(id){

      let token = localStorage.getItem('tokenBT');
      const headers = new HttpHeaders({
          // 'Content-Type': 'application/json',
          token
      });

      const url = URL_SERVICE.url + '/carrier/habilitar/' + id;

      return this.http.delete(url, { headers }).pipe(map((data: any) => data));
    }
}