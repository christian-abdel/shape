import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  salt: string;
  loggedin: boolean = false;

  baseUrl = `https://3000-cyan-scallop-0n4xh9s4.ws-eu03.gitpod.io/`;

  constructor(private http: HttpClient) { }

  getSalt(): void {
   this.salt = "$2a$10$9KjwSH4RbLDtkJkL/emTwe";
  }

  setLogStatus(status: boolean): void {
    this.loggedin = status;
  }


  login(username: string, password: string) {
    let url = `${this.baseUrl}login`;
    const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let body = new HttpParams();
    body = body.set('username', username);

    let content = this.http.post(url, body, { headers: myheader });

    return content;
  }

  register(username: string, password: string) {
    let pwd = bcrypt.hashSync(password, this.salt);

    let url = `${this.baseUrl}register`;
    const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let body = new HttpParams();
    body = body.set('username', username);
    body = body.set('pwd', pwd);

    let content = this.http.post(url, body, { headers: myheader });

    return content;
  }


}
