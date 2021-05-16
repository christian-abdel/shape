import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as bcrypt from "bcryptjs";
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  @ViewChild('wrongUsernameOrPassword') wrongUsernameOrPassword: ElementRef;

  apiServiceObs: Observable<Object>;
  result = 0;

  registrationForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder) {  }

  onSubmit(): void {
    let data = this.registrationForm.value;

    if ((data.username == "") || (data.username == null) || (data.password == "") || (data.password == null)) {
      this.result = 1;
    } else {
      this.result = 0;
      this.apiServiceObs = this.api.login(data.username, data.password);
      this.apiServiceObs.subscribe((content) => {
        if (bcrypt.compareSync(data.password, content[0]["password"])) {
          this.api.setLogStatus(true);
          localStorage.setItem('token', data.username);
          localStorage.setItem('height', content[0]["height"]);
          localStorage.setItem('weight', content[0]["weight"]);

          window.location.href = './list';
        } else { this.result = 1; }
      });
    }

    this.registrationForm.reset();
  }

}
