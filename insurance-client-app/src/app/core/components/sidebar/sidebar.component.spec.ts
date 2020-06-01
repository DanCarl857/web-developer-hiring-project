import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let comp: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [BrowserModule, FormsModule, ReactiveFormsModule]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SidebarComponent);

        comp = fixture.componentInstance;
        el = de.nativeElement;
      });
  });

  it('should create the component', () => {
    expect(comp).toBeTruthy();
  });

  it('should render title in h1 tag', () => {
    const fixture = TestBed.createComponent(SidebarComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h4').textContent).toContain('Loss Control');
  });
});
