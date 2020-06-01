import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [FooterComponent, NavbarComponent, SidebarComponent],
  imports: [CommonModule, HttpClientModule, RouterModule],
  exports: [SidebarComponent, FooterComponent, NavbarComponent]
})
export class CoreModule {}
