import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIGatewayURL } from './var.constant';
import { Router } from '@angular/router';
import { EncryptionHelper } from './encryptionHelper';

@Injectable()
export class LoginService {
    logeado: boolean = false;

    url: string = APIGatewayURL;

    constructor(private http: HttpClient, private router: Router, private encryption: EncryptionHelper) { }

    login(nombre_usuario: string, contrasena: string) {
        let sbody = this.createBodyCredential(nombre_usuario, contrasena)
        return this.http.post(`${this.url}/authenticate`, sbody);
    }

    createBodyCredential(userName: string, password: string) {
        let body; let sbody;
        
        if (1 === 1) {
            body = `${this.encryption.encrypt(userName)},${this.encryption.encrypt(password)}`;
            body = `{"credential":"${body}"}`;
            sbody = JSON.parse(body);
        } else {
            body = `{"username":"${userName}","password":"${password}"}`;
            body = this.encryption.encrypt(body);
            sbody = JSON.parse(body);
        }
        return sbody;
    }

    estaLogeado() {
        //return this.logeado;
        let token = sessionStorage.getItem("access_token");
        return token != null ? 1 : 0;
    }

    cerrarSesion() {
        //return this.logeado;
        sessionStorage.removeItem("access_token");
        this.router.navigate(['login']);
    }
}