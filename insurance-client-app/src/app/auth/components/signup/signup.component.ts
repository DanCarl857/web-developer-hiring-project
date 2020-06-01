/* eslint-disable no-extra-boolean-cast */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/models/user.model';

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

  constructor(private router: Router, private authService: AuthService) {
    this.createForm();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async onSubmit() {
    this.submitted = true;
    try {
      const user = {
        email: this.signupForm.controls['email'].value,
        name: this.signupForm.controls['name'].value,
        phone: this.signupForm.controls['phone'].value,
        address: this.signupForm.controls['address'].value,
        confirmPassword: this.signupForm.controls['confirmPassword'].value,
        password: this.signupForm.controls['password'].value
      };

      console.log(user);

      const res: User = await this.authService.register(user);
      if (!res) {
        throw new Error('Registration failed');
      }
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }
}
