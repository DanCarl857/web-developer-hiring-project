import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let comp: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent],
      imports: [BrowserModule, FormsModule, ReactiveFormsModule]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(FooterComponent);

        comp = fixture.componentInstance;
        de = fixture.debugElement.query(By.css('form'));
        el = de.nativeElement;
      });
  });

  it('should create the component', () => {
    expect(comp).toBeTruthy();
  });

  it('should render header in h6 tag', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('span').textContent).toContain(
      'Copyright © Loss Control +'
    );
  });
});
