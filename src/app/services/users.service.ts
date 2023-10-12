import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Login } from '../clases/login';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private httpClient = inject(HttpClient)
  private baseUrl: string

  constructor() {
    this.baseUrl = 'http://localhost:1337/auth/local'
   }

   login(formValue: Login){
    return firstValueFrom(
      this.httpClient.post<any>(this.baseUrl, formValue)
    )
   }
}
