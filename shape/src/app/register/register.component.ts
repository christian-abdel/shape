import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @ViewChild('alreadyRegistered') alreadyRegistered: ElementRef;
  @ViewChild('missingValues') missingValues: ElementRef;

  apiServiceObs: Observable<Object>;

  registrationForm = this.formBuilder.group({
    username: '',
    password: '',
    confirmPassword: ''
  });

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder
  ) {  }

  result = 0;

  onsubmit(): void {
    let data = this.registrationForm.value;

    if ((data.username == "") || (data.username == null) || (data.password == "") || (data.password == null) || (data.confirmPassword == "") || (data.confirmPassword == null) ) {
      this.result = 1;
    } else {
      this.apiServiceObs = this.api.register(data.username, data.password);
      this.apiServiceObs.subscribe((d) => {
        if (d['status'] == 'done') {
          console.log('Registrazione eseguita correttamente');
          window.location.href = "./";
        } else if (d['status'] == 'existing_user'){
          this.result = 2;
        } else {
          console.log('Errore! Risposta non prevista dal server registrazione');
        }
      });

    }

    this.registrationForm.reset();
  }
}
