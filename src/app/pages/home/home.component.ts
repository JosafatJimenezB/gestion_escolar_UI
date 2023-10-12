import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {



  constructor(
    private loginService: LoginService
  ) {}

  logout(){
    this.loginService.logout();
  }

  getUserDetails(){
    return this.loginService.getUserDetails();
  }

}
