/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PropertyService } from 'src/app/core/services/property.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
  propertyForm: FormGroup;
  property = {
    name: '',
    price: '',
    address: '',
    contact: '',
    description: ''
  };
  submitted = false;
  properties: any = [];

  constructor(private propertyService: PropertyService) {
    this.getAllProperties();
    this.createForm();
  }

  ngOnInit() {}

  async getAllProperties() {
    const value = await this.propertyService.getAllProperties();
    this.properties = [...value.data];
  }

  createForm(): void {
    this.propertyForm = new FormGroup({
      name: new FormControl(this.property.name, [
        Validators.required,
        Validators.minLength(4)
      ]),
      price: new FormControl(this.property.price, [Validators.required]),
      address: new FormControl(this.property.address, [
        Validators.required,
        Validators.minLength(9)
      ]),
      contact: new FormControl(this.property.contact, [
        Validators.required,
        Validators.minLength(4)
      ]),
      description: new FormControl()
    });
  }

  async onSubmit(c) {
    this.submitted = true;

    try {
      const property = {
        name: this.propertyForm.controls['name'].value,
        price: this.propertyForm.controls['price'].value,
        address: this.propertyForm.controls['address'].value,
        contact: this.propertyForm.controls['contact'].value,
        description: this.propertyForm.controls['description'].value
      };

      await this.propertyService.createProperty(property);
      this.getAllProperties();
    } catch (error) {
      console.log(error);
    }
  }
}
