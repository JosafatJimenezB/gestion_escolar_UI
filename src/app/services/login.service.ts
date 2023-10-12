import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Login } from '../clases/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

    private getHttpOptions() {
      const token = this.cookieService.get('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      });

      return { headers };
    }

    login(credentials: Login){
      console.log(credentials)
      return this.http.post('http://localhost:1337/api/auth/local', credentials, {
        observe: 'response'
      }).pipe(map((response: HttpResponse<any>) => {

        const body = response.body;
        const token = body.jwt;
        const username = body.user.username;
        if (token) {
          const expirationTime = new Date();

          expirationTime.setMinutes(expirationTime.getMinutes() + 30);

          this.cookieService.set('token', token, expirationTime, '/');
          this.cookieService.set('token_expiration', expirationTime.toISOString(), expirationTime, ('/'))
          this.cookieService.set('user', username, expirationTime, '/')
        }
        return body;
      }))
    }

    getToken(){
      return this.cookieService.get('token');
    }

    getUserDetails(){
      return this.cookieService.get('user');
    }

    logout(){
      this.cookieService.delete('token');
      this.cookieService.delete('token_expiration');
    }
}
