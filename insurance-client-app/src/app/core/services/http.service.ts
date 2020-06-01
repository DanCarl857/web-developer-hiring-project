/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // Development URL
  apiRoot = 'http://localhost:7001/v1/api';

  // Production URL
  // apiRoot = '';
  accessToken: any;
  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
    if (!this.accessToken) {
      this.accessToken = localStorage.getItem('mcq-jwt');
    }
  }

  private setOptions(withAuth: boolean) {
    this.options.headers = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json'
    });
    if (withAuth && !this.accessToken) {
      throw new Error('No Access Token Found');
    }
  }

  async get(url: string, requestParams: object, withAuth = true): Promise<any> {
    try {
      this.setOptions(withAuth);
      const params: string = new HttpParams(requestParams).toString();
      const res = await this.http.get<any>(`${url}`, this.options).toPromise();
      if (!!res.error) {
        throw res;
      }
      return res;
    } catch (error) {
      return error;
    }
  }

  async post(url: string, requestBody: object, withAuth = true): Promise<any> {
    try {
      this.setOptions(withAuth);
      const res = await this.http
        .post<any>(`${url}`, requestBody, this.options)
        .toPromise();
      if (!!res.error) {
        throw res;
      }
      return res;
    } catch (error) {
      return error;
    }
  }

  async put(url: string, requestBody: object, withAuth = true): Promise<any> {
    try {
      this.setOptions(withAuth);
      const res = await this.http
        .put<any>(`${url}`, requestBody, this.options)
        .toPromise();
      if (!!res.error) {
        throw res;
      }
      return res;
    } catch (error) {
      return error;
    }
  }

  async delete(
    url: string,
    requestBody: object,
    withAuth = true
  ): Promise<any> {
    try {
      this.setOptions(withAuth);
      const params: string = new HttpParams(requestBody).toString();
      const options = { ...this.options, body: params };
      const res = await this.http.delete<any>(`${url}`, options).toPromise();
      if (!!res.error) {
        throw res;
      }
      return res;
    } catch (error) {
      return error;
    }
  }
}
