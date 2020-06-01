import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login'
  },
  // {
  //   path: 'homepage',
  //   loadChildren: () => import('./home/home.module').then((m) => m.HomeModule)
  // },
  {
    path: 'authentication',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  }
  // {
  //   path: 'core',
  //   loadChildren: () => import('./core/core.module').then((m) => m.CoreModule)
  // }
  // {
  //   path: 'authentication',
  //   pathMatch: 'full',
  //   loadChildren: () => AuthModule
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
