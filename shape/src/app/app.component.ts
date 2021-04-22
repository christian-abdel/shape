import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loggedin:boolean = false;
  constructor(private api: ApiService){
    this.loggedin = this.api.loggedin;
  }

  ngOnInit(): void {
    if(!!localStorage.getItem('token')){
      this.api.setLogStatus(true);
    }
  }

  logOut(){
    this.api.setLogStatus(false);
  }
}
