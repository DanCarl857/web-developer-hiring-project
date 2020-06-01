import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './http.service';
import { User } from './../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpService, private router: Router) {}

  async login(email: string, password: string): Promise<User> {
    // eslint-disable-next-line no-useless-catch
    try {
      const BASE_URL = `${this.http.apiRoot}/auth/login`;
      const res = await this.http.post(BASE_URL, { email, password }, false);
      if (res.error) {
        throw res;
      }
      const { user, token } = res;
      localStorage.setItem('losscontrol-token', token);
      localStorage.setItem('losscontrol-user', user);
      return res;
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    localStorage.removeItem('losscontrol-token');
    localStorage.removeItem('losscontrol-user');
    this.router.navigate(['login']);
  }
}
