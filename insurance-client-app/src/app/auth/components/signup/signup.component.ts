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

  constructor() {
    this.createForm();
  }

  ngOnInit() {}

  createForm(): void {
    this.signupForm = new FormGroup({
      email: new FormControl(this.signup.email, [
        Validators.required,
        Validators.email
      ]),
      name: new FormControl(this.signup.name, [
        Validators.required,
        Validators.minLength(4)
      ]),
      phone: new FormControl(this.signup.phone, [
        Validators.required,
        Validators.minLength(9)
      ]),
      address: new FormControl(this.signup.address, [
        Validators.required,
        Validators.minLength(4)
      ]),
      confirmPassword: new FormControl(this.signup.confirmPassword, [
        Validators.required,
        Validators.minLength(4)
      ]),
      password: new FormControl(this.signup.password, [
        Validators.required,
        Validators.minLength(4)
      ])
    });
  }

  onSubmit(): void {
    this.submitted = true;
  }
}
