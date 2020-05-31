import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  signup = {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    address: ''
  };
  submitted = false;

  constructor() {}

  ngOnInit() {}

  createForm(): void {}

  onSubmit(): void {}
}
