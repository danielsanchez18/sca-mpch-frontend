import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityMainPageComponent } from './pages/main/main-page.component';
import { SecurityOverviewPageComponent } from './pages/overview/overview-page.component';
import { SecurityAssistancesRegisterComponent } from './pages/assistances/register/assistances-register.component';
import { SecurityAssistancesOverviewComponent } from './pages/assistances/overview/assistances-overview.component';
import { SecurityAssistancesOverviewMonthComponent } from './pages/assistances/overview/layouts/month/assistances-overview-month.component';
import { SecurityAssistancesOverviewWeekComponent } from './pages/assistances/overview/layouts/week/assistances-overview-week.component';
import { SecurityAssistancesOverviewTodayComponent } from './pages/assistances/overview/layouts/today/assistances-overview-today.component';
import { SecurityInternDetailsComponent } from './pages/interns/details/intern-details.component';
import { SecurityCertificatedOverviewComponent } from './pages/certificated/overview/certificated-overview.component';
import { SecurityInternOverviewComponent } from './pages/interns/overview/intern-overview.component';
import { SecurityProfileDetailsComponent } from './pages/profile/details/profile-details.component';
import { SecurityEditComponent } from '../admin/pages/user/layouts/security/edit/security-edit.component';

const routes: Routes = [
  {
    path: '',
    component: SecurityMainPageComponent,
    children: [
      {
        path: '', redirectTo: 'overview', pathMatch: 'full'
      },
      {
        path: 'overview', component: SecurityOverviewPageComponent
      },
      {
        path: 'asistencias', redirectTo: 'asistencias', pathMatch: 'full'
      },
      {
        path: 'asistencias', component: SecurityAssistancesRegisterComponent
      },
      {
        path: 'asistencias/overview',
        component: SecurityAssistancesOverviewComponent,
        children: [
          {
            path: '', component: SecurityAssistancesOverviewTodayComponent
          },
          {
            path: 'sem', component: SecurityAssistancesOverviewWeekComponent
          },
          {
            path: 'mes', component: SecurityAssistancesOverviewMonthComponent
          }
        ]
      },
      {
        path: 'practicantes', component: SecurityInternOverviewComponent
      },
      {
        path: 'practicantes/:id', component: SecurityInternDetailsComponent
      },
      {
        path: 'certificados', component: SecurityCertificatedOverviewComponent
      },
      {
        path: 'perfil',
        children: [
          {
            path: ':id', component: SecurityProfileDetailsComponent
          },
          {
            path: ':id/editar', component: SecurityEditComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
