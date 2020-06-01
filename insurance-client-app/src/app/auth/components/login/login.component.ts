/* eslint-disable no-extra-boolean-cast */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';

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

  constructor(private router: Router, private authService: AuthService) {
    this.createForm();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async onSubmit() {
    this.submitted = true;
    try {
      const user = {
        email: this.loginForm.controls['email'].value,
        password: this.loginForm.controls['password'].value
      };

      const res: User = await this.authService.login(user.email, user.password);
      if (!res) {
        throw new Error('Login failed');
      }
      this.router.navigate(['/homepage/home']);
    } catch (error) {
      console.log(error);
    }
  }
}
