import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { URL_SERVICE } from '../config/config';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { ShippingAgreement, DetailShippingAgreement, StatusShippingAgreement } from '../models/envio.model';

@Injectable({
  providedIn: 'root'
})
export class ShippingAgreementService {

  constructor(
    private http: HttpClient
  ) { }

  addShipping(envio: ShippingAgreement){
    let token = localStorage.getItem('tokenBT');

    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        token
    });

    const url = URL_SERVICE.url + '/shippingAgreement';

    return this.http.post(url, envio, { headers }).pipe(map((data: any) => data.shippingAgreement));
  }

  addDetailShipping(detalle: DetailShippingAgreement){
    let token = localStorage.getItem('tokenBT');

    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        token
    });

    const url = URL_SERVICE.url + '/agreementDetail';

    return this.http.post(url, detalle, { headers }).pipe(map((data: any) => data.agreementDetail));
  }

  addStatus(estado: StatusShippingAgreement){
    let token = localStorage.getItem('tokenBT');

    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        token
    });

    const url = URL_SERVICE.url + '/status';

    return this.http.post(url, estado, { headers }).pipe(map((data: any) => data.status));
  }

  getEnvios(idSuc: string){
    let token = localStorage.getItem('tokenBT');
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        token
    });

    const url = URL_SERVICE.url + '/shippingAgreement/todos/' + idSuc;

    return this.http.get(url, { headers })
        .pipe(map((data: any) => {
          return data.shippingAgreement;
        }));
  }

  getEnviosHoy(idSuc: string){
    let token = localStorage.getItem('tokenBT');
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        token
    });

    const url = URL_SERVICE.url + '/shippingAgreement/hoy/' + idSuc;

    return this.http.get(url, { headers })
        .pipe(map((data: any) => {
          return data.shippingAgreement;
        }));
  }

  getDetallesEnvio(idSol){
    let token = localStorage.getItem('tokenBT');
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        token
    });

    const url = URL_SERVICE.url + '/agreementDetail/' + idSol;

    return this.http.get(url, { headers })
        .pipe(map((data: any) => {
          return data.agreementDetail;
        }));
  }

  rastrearEnvio(idClient, rastreo){
    let token = localStorage.getItem('tokenBT');
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        token
    });

    const url = URL_SERVICE.url + '/shippingAgreement/rastreo/' + idClient + '/' + rastreo;

    return this.http.get(url, { headers })
        .pipe(map((data: any) => {
          return data;
        }));
  }

  searchEnvio(termino, idSuc){
    let token = localStorage.getItem('tokenBT');
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        token
    });

    const url = URL_SERVICE.url + '/shippingAgreement/buscar/' + termino + '/' + idSuc;

    return this.http.get(url, { headers })
        .pipe(map((data: any) => {
          return data.agreement;
        }));
  }
}
