import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { DataTableModule } from 'angular-6-datatable';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { CoreModule } from '../core/core.module';
import { PropertyComponent } from './components/property/property.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, PropertyComponent, DashboardComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    CoreModule,
    ChartsModule,
    ReactiveFormsModule,
    FormsModule,
    DataTableModule
  ]
})
export class HomeModule {}
