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
    path: 'asistente',
    loadChildren: () => import('./features/assistant/assistant.module').then(m => m.AssistantModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
