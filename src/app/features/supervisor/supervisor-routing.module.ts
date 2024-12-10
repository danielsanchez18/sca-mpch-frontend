import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupervisorMainPageComponent } from './pages/main/main-page.component';
import { SupervisorOverviewPageComponent } from './pages/overview/overview-page.component';
import { SupervisorInternDetailsComponent } from './pages/interns/details/intern-details.component';
import { SupervisorInternOverviewComponent } from './pages/interns/overview/intern-overview.component';
import { SupervisorAssistancesOverviewComponent } from './pages/assistances/overview/assistances-overview.component';
import { SupervisorAssistancesOverviewTodayComponent } from './pages/assistances/overview/layouts/today/assistances-overview-today.component';
import { SupervisorAssistancesOverviewWeekComponent } from './pages/assistances/overview/layouts/week/assistances-overview-week.component';
import { SupervisorAssistancesOverviewMonthComponent } from './pages/assistances/overview/layouts/month/assistances-overview-month.component';
import { SupervisorAreasOverviewComponent } from './pages/areas/overview/areas-overview.component';
import { SupervisorAreasDetailsComponent } from './pages/areas/details/areas-details .component';
import { SupervisorUniveristyOverviewComponent } from './pages/university/overview/univeristy-overview.component';
import { SupervisorUniversityDetailsComponent } from './pages/university/details/university-details.component';
import { SupervisorProfileDetailsComponent } from './pages/profile/details/profile-details.component';

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
      },
      {
        path: 'practicantes', component: SupervisorInternOverviewComponent,
      },
      {
        path: 'practicantes/:id', component: SupervisorInternDetailsComponent,
      },
      {
        path: 'asistencias',
        component: SupervisorAssistancesOverviewComponent,
        children: [
          {
            path: '', component: SupervisorAssistancesOverviewTodayComponent
          },
          {
            path: 'sem', component: SupervisorAssistancesOverviewWeekComponent
          },
          {
            path: 'mes', component: SupervisorAssistancesOverviewMonthComponent
          }
        ]
      },
      {
        path: 'areas',
        component: SupervisorAreasOverviewComponent
      },
      {
        path: 'areas/:id',
        component: SupervisorAreasDetailsComponent
      },
      {
        path: 'universidades',
        component: SupervisorUniveristyOverviewComponent
      },
      {
        path: 'universidades/:id',
        component: SupervisorUniversityDetailsComponent
      },
      {
        path: 'perfil/:id',
        component: SupervisorProfileDetailsComponent
      },
    ]
  }
];

@NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    })
  export class SupervisorRoutingModule { }
