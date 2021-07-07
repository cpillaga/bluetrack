import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { URL_SERVICE } from '../config/config';
import { Operator } from '../models/operator.model';

@Injectable({
  providedIn: 'root'
})
export class OperatorService {

  constructor(
    private http: HttpClient
  ) { }

  login(user, password) {
    const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    const url = URL_SERVICE.url + '/operator/login';

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

  
  addOperator(operator: Operator){
    let token = localStorage.getItem('tokenBT');

    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        token
    });

    const url = URL_SERVICE.url + '/operator';

    return this.http.post(url, operator, { headers }).pipe(map((data: any) => data));
  }

  getOperator(id){
    let token = localStorage.getItem('tokenBT');
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        token
    });

    const url = URL_SERVICE.url + '/operator/' + id;
    return this.http.get(url, { headers })
        .pipe(map((data: any) => {
          return data.operator;
        }));
  }

  deleteTrans(id){

    let token = localStorage.getItem('tokenBT');
    const headers = new HttpHeaders({
        // 'Content-Type': 'application/json',
        token
    });

    const url = URL_SERVICE.url + '/operator/' + id;

    return this.http.delete(url, { headers }).pipe(map((data: any) => data));
  }

  habilitaTrans(id){

    let token = localStorage.getItem('tokenBT');
    const headers = new HttpHeaders({
        // 'Content-Type': 'application/json',
        token
    });

    const url = URL_SERVICE.url + '/operator/habilitar/' + id;

    return this.http.delete(url, { headers }).pipe(map((data: any) => data));
  }

  recoverPsw(email){
    const url = URL_SERVICE.url + '/ope/recoverPsw';

    let operator = {
      email
    };

    return this.http.put(url, operator).pipe(map((data: any) => data));
  }
}