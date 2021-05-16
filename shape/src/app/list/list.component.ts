import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  list: any;
  colazione = [];
  merenda1 = [];
  pranzo = [];
  merenda2 = [];
  cena = [];

  dateObj = new Date();
  month = this.dateObj.getMonth() + 1; //months from 1-12
  day = this.dateObj.getDate();
  year = this.dateObj.getFullYear();
  date = `${this.year}-${this.month}-${this.day}`;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getUserData().subscribe((data) => {
      this.list = data;
      for(let i of this.list) {
        if (i.data == this.date){
          if (i.pasto == "Colazione") { this.colazione.push(i); }
          if (i.pasto == "Merenda 1") { this.merenda1.push(i); }
          if (i.pasto == "Pranzo") { this.pranzo.push(i); }
          if (i.pasto == "Merenda 2") { this.merenda2.push(i); }
          if (i.pasto == "Cena") { this.cena.push(i); }
        }
      }

    });
  }

  updateList() {
    this.colazione = [];
    this.merenda1 = [];
    this.pranzo = [];
    this.merenda2 = [];
    this.cena = [];
    for(let i of this.list) {
      if (i.data == this.date){
        if (i.pasto == "Colazione") { this.colazione.push(i); }
        if (i.pasto == "Merenda 1") { this.merenda1.push(i); }
        if (i.pasto == "Pranzo") { this.pranzo.push(i); }
        if (i.pasto == "Merenda 2") { this.merenda2.push(i); }
        if (i.pasto == "Cena") { this.cena.push(i); }
      }
    }
  }

  add() {
    let dateObj = new Date(this.dateObj.setDate(this.dateObj.getDate() + 1));
    this.dateObj = dateObj;
    this.month = dateObj.getMonth() + 1; //months from 1-12
    this.day = dateObj.getDate();
    this.year = dateObj.getFullYear();
    this.date = `${this.year}-${this.month}-${this.day}`;
    this.updateList();
    return false;
  }

  remove() {
    let dateObj = new Date(this.dateObj.setDate(this.dateObj.getDate() - 1));
    this.dateObj = dateObj;
    this.month = dateObj.getMonth() + 1; //months from 1-12
    this.day = dateObj.getDate();
    this.year = dateObj.getFullYear();
    this.date = `${this.year}-${this.month}-${this.day}`;
    this.updateList();
    return false;
  }

}
