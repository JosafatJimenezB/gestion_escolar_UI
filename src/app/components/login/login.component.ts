import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/clases/login';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  LoginResponse: Login = {
    identifier: '',
    password: ''
  }

  constructor(
    private loginService: LoginService,
    private router: Router
  ){}

  loginSubmit(form: NgForm){
    console.log(form.value)
    this.loginService.login(this.LoginResponse)
      .subscribe(response => {
        this.router.navigate([''])
      })
  }

}
