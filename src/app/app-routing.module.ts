import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './features/login/login.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'ingresar', pathMatch: 'full'
  },
  {
    path: 'ingresar', component: UserLoginComponent
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'supervisor',
    loadChildren: () => import('./features/supervisor/supervisor.module').then(m => m.SupervisorModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
