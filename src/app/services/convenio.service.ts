import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { URL_SERVICE } from '../config/config';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { Agreement } from '../models/agreement.model';

@Injectable({
  providedIn: 'root'
})
export class ConvenioService {

  constructor(
    private http: HttpClient
  ) { }

  getConvenio(idSucursal){
    let token = localStorage.getItem('tokenBT');

    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        token
    });

    const url = URL_SERVICE.url + '/agreement/' + idSucursal;

    return this.http.get(url, { headers }).pipe(map((data: any) => data));
  }

  addConvenio(convenio: Agreement){
    let token = localStorage.getItem('tokenBT');

    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        token
    });

    const url = URL_SERVICE.url + '/agreement';

    return this.http.post(url, convenio, { headers }).pipe(map((data: any) => data));
  }
}
