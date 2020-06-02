import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor() {
    this.createForm();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ngOnInit() {}

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

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async onSubmit() {
    this.submitted = true;

    try {
      const property = {
        name: this.propertyForm.controls['name'].value,
        price: this.propertyForm.controls['price'].value,
        address: this.propertyForm.controls['address'].value,
        contact: this.propertyForm.controls['contact'].value,
        description: this.propertyForm.controls['description'].value
      };

      console.log(property);
    } catch (error) {
      console.log(error);
    }
  }
}
