import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class GeneralService{
    Authorization: any;
    userToken: string;

    constructor(
        private http: HttpClient
    ) { }

    tokenReturn() {
        if (localStorage.getItem("token")) {
            this.userToken = localStorage.getItem('token');
        } else {
            this.userToken = '';
        }

        return this.userToken;
    }
}