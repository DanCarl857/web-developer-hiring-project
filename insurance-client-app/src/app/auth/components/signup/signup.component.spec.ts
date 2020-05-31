import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SignupComponent } from './signup.component';
import { DebugElement } from '@angular/core';

describe('SignupComponent', () => {
  let comp: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [BrowserModule, FormsModule, ReactiveFormsModule]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SignupComponent);

        comp = fixture.componentInstance;
        de = fixture.debugElement.query(By.css('form'));
        el = de.nativeElement;
      });
  });

  it('should create the component', () => {
    expect(comp).toBeTruthy();
  });

  it('should render title in h1 tag', () => {
    const fixture = TestBed.createComponent(SignupComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'Create Account'
    );
  });

  it('should set submitted to true', async(() => {
    comp.onSubmit();
    expect(comp.submitted).toBeTruthy();
  }));

  it('should call the onsubmit method', async(() => {
    const fixture = TestBed.createComponent(SignupComponent);
    fixture.detectChanges();
    spyOn(comp, 'onSubmit');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(comp.onSubmit).toHaveBeenCalledTimes(0);
  }));

  it('form should be invalid', async(() => {
    comp.signupForm.controls['email'].setValue('');
    comp.signupForm.controls['name'].setValue('');
    comp.signupForm.controls['phone'].setValue('');
    comp.signupForm.controls['address'].setValue('');
    comp.signupForm.controls['password'].setValue('');
    comp.signupForm.controls['confirmPassword'].setValue('');
    expect(comp.signupForm.valid).toBeFalsy();
  }));

  it('form should be valid', async(() => {
    comp.signupForm.controls['email'].setValue('daniel@gmail.com');
    comp.signupForm.controls['name'].setValue('Daniel Insurance');
    comp.signupForm.controls['phone'].setValue('+237673489057');
    comp.signupForm.controls['address'].setValue('1st Boulevard, NY');
    comp.signupForm.controls['password'].setValue('test123');
    comp.signupForm.controls['confirmPassword'].setValue('test123');
    expect(comp.signupForm.valid).toBeTruthy();
  }));
});
