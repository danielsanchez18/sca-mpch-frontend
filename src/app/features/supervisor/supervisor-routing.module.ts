import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupervisorMainPageComponent } from './pages/main/main-page.component';
import { SupervisorOverviewPageComponent } from './pages/overview/overview-page.component';

const routes: Routes = [
  {
    path: '',
    component: SupervisorMainPageComponent,
    children: [
      {
        path: '', redirectTo: 'overview', pathMatch: 'full'
      },
      {
        path: 'overview', component: SupervisorOverviewPageComponent
      }
    ]
  }
];

@NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    })
  export class SupervisorRoutingModule { }
