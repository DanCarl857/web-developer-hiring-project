import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PropertyComponent } from './components/property/property.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', component: DashboardComponent, outlet: 'sidebar' },
      { path: 'dashboard', component: DashboardComponent, outlet: 'sidebar' },
      { path: 'property', component: PropertyComponent, outlet: 'sidebar' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
