import { LoginService } from './../_services/login.service';

import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mensaje: string;

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
  }

  iniciarSesion(form: NgForm) {
    let nombre_usuario = form.value.usuario;
    let password = form.value.clave;

    this.loginService.login(nombre_usuario, password).subscribe(data => { // Me devuelve un observable     
      //let token = JSON.stringify(data);
      let token = data["sec"];
      sessionStorage.setItem("access_token", token);

      if (token) {
        this.router.navigate(['auction']);
      }
    }, err => {
      this.mensaje = "Credenciales Incorrectas";
      console.log(err);
    });
  }
}