import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loggedin = !!localStorage.getItem('token');
  imc: number;
  ctgry: string;

  constructor() { }

  ngOnInit(): void {
    if(this.loggedin) {
      let weight = Number(localStorage.getItem('weight'));
      let height = Number(localStorage.getItem('height'))/100;
      this.imc = weight / (height * height)
      this.imc = Math.floor(this.imc*100)/100;

      if(this.imc <= 15) { this.ctgry = "sottopeso molto grave"; }
      if(this.imc > 15 && this.imc <= 16) { this.ctgry = "sottopeso grave"; }
      if(this.imc > 16 && this.imc <= 18.5) { this.ctgry = "sottopeso"; }
      if(this.imc > 18.5 && this.imc <= 25) { this.ctgry = "normopeso"; }
      if(this.imc > 25 && this.imc <= 30) { this.ctgry = "sovrappeso"; }
      if(this.imc > 30 && this.imc <= 35) { this.ctgry = "obeso"; }
      if(this.imc > 35) { this.ctgry = "sovrappeso grave"; }
    }
  }

}
