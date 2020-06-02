import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PropertyComponent } from './property/property.component';

const routes: Routes = [
  {
    path: 'home',
    children: [
      { path: '', component: HomeComponent },
      { path: 'property', component: PropertyComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
