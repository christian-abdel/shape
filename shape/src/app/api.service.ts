import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as bcrypt from 'bcryptjs';
import { Subject, Observable } from 'rxjs';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private subject = new Subject<any>();

  setfoodList() {
	this.getfoods().subscribe((data)=> {
    this.subject.next(data);
  });
  }

  getfoodList(){
	 return this.subject.asObservable();
  }

  salt: string;
  loggedin: boolean = false;
  foodlist: any;

  baseUrl = `https://3000-teal-llama-xarmk2f1.ws-eu04.gitpod.io/`;

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

  getfoods(){
    let url = `${this.baseUrl}getfoods`;
    let content = this.http.get(url);

    return content;
  }

  addFood(pasto: string, cibo: string, grammi: string) {
    let url = `${this.baseUrl}addFood`;

    var dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let body = new HttpParams();
    body = body.set('data', `${year}-${month}-${day}`);
    body = body.set('username', localStorage.getItem('token'));
    body = body.set('pasto', pasto);
    body = body.set('cibo', cibo);
    body = body.set('grammi', grammi);

    let content = this.http.post(url, body, { headers: myheader });

    return content;
  }

  getUserData() {
    let content = this.http.get(`${this.baseUrl}getUserData/${localStorage.getItem('token')}`);
    return content;
  }

}
