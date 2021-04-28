import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loggedin:boolean;
  constructor(private api: ApiService){
    this.api.setfoodList();
  }

  ngOnInit(): void {
    if(!!localStorage.getItem('token')){
      this.api.setLogStatus(true);
    }

    this.api.getSalt();
    this.refreshLogStatus();
  }

  public refreshLogStatus(): void {
    this.loggedin = this.api.loggedin;
  }

  logOut(){
    this.api.setLogStatus(false);
    this.loggedin = this.api.loggedin;
    localStorage.removeItem('token');
  }
}
