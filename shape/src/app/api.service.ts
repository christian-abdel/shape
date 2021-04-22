import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  salt: string;
  loggedin: boolean = false;

  baseUrl = ``;

  constructor(private http: HttpClient) { }

  getSalt(): void {
   this.salt = "$2a$34$WSVz1hgKsfdTq4NhpVqA2e";
  }

  setLogStatus(status: boolean): void {
    this.loggedin = status;
  }


  login(username: string, password: string) {
    let url = `${this.baseUrl}login/${username}`;
    let content = this.http.get(url);

    return content;
  }

  register(username: string, password: string) {
    //let pwd = bcrypt.hashSync(password, this.salt);

    let url = `${this.baseUrl}register`;
    const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let body = new HttpParams();
    body = body.set('username', username);
    //body = body.set('pwd', pwd);

    let content = this.http.post(url, body, { headers: myheader }); // result can be "done" or "existing_user"
    console.log(content);

    return content;
  }


}
