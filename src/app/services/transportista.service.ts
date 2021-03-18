import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICE } from '../config/config';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { User } from '../models/carrier.model';

@Injectable({
  providedIn: 'root'
})
export class TransService {
  
  constructor(
    private http: HttpClient
  ) { }

    addTrans(carrier: User){
        let token = localStorage.getItem('tokenBT');

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            token
        });

        const url = URL_SERVICE.url + '/user';

        return this.http.post(url, carrier, { headers }).pipe(map((data: any) => data));
    }

    getTrans(id){
      let token = localStorage.getItem('tokenBT');
      const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          token
      });

      const url = URL_SERVICE.url + '/user/' + id;
      return this.http.get(url, { headers })
          .pipe(map((data: any) => {
            return data.user;
          }));
    }

    deleteTrans(id){

      let token = localStorage.getItem('tokenBT');
      const headers = new HttpHeaders({
          // 'Content-Type': 'application/json',
          token
      });

      const url = URL_SERVICE.url + '/user/' + id;

      return this.http.delete(url, { headers }).pipe(map((data: any) => data));
    }

    habilitaTrans(id){

      let token = localStorage.getItem('tokenBT');
      const headers = new HttpHeaders({
          // 'Content-Type': 'application/json',
          token
      });

      const url = URL_SERVICE.url + '/user/habilitar/' + id;

      return this.http.delete(url, { headers }).pipe(map((data: any) => data));
    }
}