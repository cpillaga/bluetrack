import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { URL_SERVICE } from '../config/config';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private http: HttpClient
  ) { }

  getClient(mail){
    let token = localStorage.getItem('tokenBT');
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        token
    });

    const url = URL_SERVICE.url + '/client/searchMail/' + mail;
    return this.http.get(url, { headers })
        .pipe(map((data: any) => {
          return data;
        }));
  }
}
