import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { URL_SERVICE } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(
    private http: HttpClient
  ) { }

  login(user, password) {
    const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    const url = URL_SERVICE.url + '/user/login';

    const body = {
        user,
        password
    };

    return this.http.post( url, this.getFormUrlEncoded(body), {headers} )
            .map( (resp: any) =>
                resp
            );
  }

  getFormUrlEncoded(toConvert) {
    const formBody = [];
    for (const property in toConvert) {
      if (toConvert) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(toConvert[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
    }
    return formBody.join('&');
  } 

}