/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  constructor(private http: HttpService) {}

  async getAllProperties() {
    const value = JSON.parse(window.localStorage.getItem('losscontrol-user'));
    console.log(value._id);
    // eslint-disable-next-line no-useless-catch
    try {
      const BASE_URL = `${this.http.apiRoot}/auth/${value._id}/properties`;
      const res = await this.http.get(BASE_URL, {}, false);
      if (res.error) {
        throw res;
      }
      return res.page;
    } catch (error) {
      throw error;
    }
  }

  async createProperty(data: any) {
    try {
      const value = window.localStorage.getItem('losscontrol-user');
      data.company = JSON.parse(value)._id;
      data.contact = data.contact.toString();
      const BASE_URL = `${this.http.apiRoot}/properties`;
      data.inspected = data.rating > 0 ? true : false;
      const inspection = {
        wiring: data.wiring,
        floor: data.floor,
        paint: data.paint,
        roof: data.roof,
        doors: data.doors
      };
      const tempInspection = JSON.stringify(inspection);
      data.inspection = tempInspection;
      const res = await this.http.post(BASE_URL, data, false);
      if (res.error) {
        throw res;
      }
      return res;
    } catch (error) {
      throw error;
    }
  }

  // async getPropertyById(id: any) {}

  // async updateProperty(id: any) {}

  // async deleteProperty(id: any) {}
}
