import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICE } from '../config/config';
import { Rutas } from '../models/rutas.model';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RutasService {

  constructor(
    private http: HttpClient
  ) { }

  getRutas(idSuc){
    let token = localStorage.getItem('tokenBT');
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        token
    });

    const url = URL_SERVICE.url + '/destCanton/' + idSuc;
    
    return this.http.get(url, { headers })
        .pipe(map((data: any) => {
          return data.destCanton;
        }));
  }

  addRutas(ruta: Rutas){
    let token = localStorage.getItem('tokenBT');

    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        token
    });

    const url = URL_SERVICE.url + '/destCanton';

    return this.http.post(url, ruta, { headers }).pipe(map((data: any) => data));
  }

  delRuta(id, estado){
    let token = localStorage.getItem('tokenBT');
    const headers = new HttpHeaders({
        // 'Content-Type': 'application/json',
        token
    });

    const url = URL_SERVICE.url + '/destCanton/'+id+'/'+ estado;

    return this.http.delete(url, { headers }).pipe(map((data: any) => data));
  }
}
