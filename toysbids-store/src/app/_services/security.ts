import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class Security {
    getStoredToken() {
        //return JSON.parse(sessionStorage.getItem("access_token")).token;
        return sessionStorage.getItem("access_token");
    }

    getHttpHeader() {
        let access_token = this.getStoredToken();
        return new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    }
}