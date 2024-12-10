import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

const routes: Routes = [
  {
    path: '', redirectTo: 'ingresar', pathMatch: 'full'
  },
  {
    path: 'ingresar',
    component: LoginComponent
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'administrador' } // Rol permitido
  },
  {
    path: 'supervisor',
    loadChildren: () => import('./features/supervisor/supervisor.module').then(m => m.SupervisorModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'supervisor' } // Rol permitido
  },
  {
    path: 'seguridad',
    loadChildren: () => import('./features/security/security.module').then(m => m.SecurityModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'seguridad' } // Rol permitido
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
