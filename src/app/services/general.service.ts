import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICE } from '../config/config';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

@Injectable()
export class GeneralService{
    Authorization: any;
    userToken: string;

    constructor(
        private http: HttpClient
    ) { }

    tokenReturn() {
        if (localStorage.getItem("tokenBT")) {
            this.userToken = localStorage.getItem('tokenBT');
        } else {
            this.userToken = '';
        }

        return this.userToken;
    }

    async subirImg(img: File){
        const url = "https://api.cloudinary.com/v1_1/physeter/image/upload?upload_preset=hdh5jkdz";

        const fd = new FormData();
        fd.append('file', img);

        const resp = await fetch( url, {
            method: 'POST',
            body: fd
        });

        const data = await resp.json();

        return data.secure_url;
    }

    getSucursal(idSuc){
        console.log("Suc: " + idSuc);
        let token = localStorage.getItem('tokenBT');
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            token
        });

        const url = URL_SERVICE.url + '/branchOffice/suc/' + idSuc;

        return this.http.get(url, { headers })
            .pipe(map((data: any) => {
                return data.branchOffice;
            }));
    }

    
  getProvincia(){
    let token = localStorage.getItem('tokenABT');
    const headers = new HttpHeaders({
      token
    });

    const url = URL_SERVICE.url + '/province';

    return this.http.get( url, {headers} )
                .map( (resp: any) =>
                    resp.province
                );
  }

  getCanton(idProv){
    let token = localStorage.getItem('tokenABT');
    const headers = new HttpHeaders({
      token
    });

    const url = URL_SERVICE.url + '/canton/' + idProv;

    return this.http.get( url, {headers} )
                .map( (resp: any) =>
                    resp.canton
                );
  }
}