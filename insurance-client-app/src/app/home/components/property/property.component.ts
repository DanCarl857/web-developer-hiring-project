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
    description: '',
    comment: 'NEUTRAL',
    rating: 0,
    floor: 0,
    wiring: 0,
    paint: 0,
    roof: 0,
    doors: 0
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
    this.properties = [...value];
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
      description: new FormControl(),
      comment: new FormControl(this.property.comment, [Validators.required]),
      rating: new FormControl(this.property.rating, [Validators.required]),
      wiring: new FormControl(),
      floor: new FormControl(),
      paint: new FormControl(),
      roof: new FormControl(),
      doors: new FormControl()
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
        description: this.propertyForm.controls['description'].value,
        comment: this.propertyForm.controls['comment'].value,
        rating: this.propertyForm.controls['rating'].value,
        wiring: this.propertyForm.controls['wiring'].value,
        floor: this.propertyForm.controls['floor'].value,
        paint: this.propertyForm.controls['paint'].value,
        roof: this.propertyForm.controls['roof'].value,
        doors: this.propertyForm.controls['doors'].value
      };

      await this.propertyService.createProperty(property);
      this.getAllProperties();
    } catch (error) {
      console.log(error);
    }
  }
}
