import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit{
  selectedFood:  string = '';

	foodOptions = [
  ]

  selectedPasto:  string = '';

	pastoOptions = [
    {n:"Colazione",v:"Colazione"},
    {n:"Merenda 1",v:"Merenda 1"},
    {n:"Pranzo",v:"Pranzo"},
    {n:"Merenda 2",v:"Merenda 2"},
    {n:"Cena",v:"Cena"},
	]

  foodlist;
  subscription: Subscription;
  apiServiceObs: Observable<Object>;

  Form = this.formBuilder.group({
    food: '',
    pasto:"",
    grammi:""
  });

  ngOnInit(){
    this.subscription = this.api.getfoodList().subscribe((data)=>{
      this.foodlist = data;
      for(let i = 0; i < this.foodlist.length; i++){
        this.foodOptions[i] = {n:this.foodlist[i]["Description"], v:this.foodlist[i]["Description"]};
      }
    })
  }

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder
  ) {  }

  result = 0;

  onsubmit(): void {
    let data = this.Form.value;
  if ((data.food == "") || (data.food == null) || (data.pasto == "") || (data.pasto == null) || (data.grammi == "") || (data.grammi == null) ) {
    } else {
      this.apiServiceObs = this.api.addFood(this.selectedPasto, this.selectedFood, data.grammi);
      this.apiServiceObs.subscribe((d) => {
        window.location.href = './list';
      });

    }

    this.Form.reset();
  }

}
