import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { CoreModule } from '../core/core.module';
import { PropertyComponent } from './property/property.component';

@NgModule({
  declarations: [HomeComponent, PropertyComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    CoreModule,
    ChartsModule
  ]
})
export class HomeModule {}
