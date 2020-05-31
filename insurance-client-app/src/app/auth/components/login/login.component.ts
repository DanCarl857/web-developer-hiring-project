import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  login = {
    email: '',
    password: ''
  };
  submitted = false;

  constructor() {
    this.createForm();
  }

  ngOnInit() {}

  createForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(this.login.email, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(this.login.password, [
        Validators.required,
        Validators.minLength(4)
      ])
    });
  }

  onSubmit(): void {
    this.submitted = true;
  }
}
