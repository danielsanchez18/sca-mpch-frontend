import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMainPageComponent } from './pages/main/main-page.component';
import { AdminOverviewPageComponent } from './pages/overview/overview-page.component';
import { AdminUserPageComponent } from './pages/user/user-page.component';
import { UserGeneralComponent } from './pages/user/layouts/general/user-general.component';
import { AdminOverviewComponent } from './pages/user/layouts/admin/overview/admin-overview.component';
import { AdminAddComponent } from './pages/user/layouts/admin/add/admin-add.component';
import { AdminEditComponent } from './pages/user/layouts/admin/edit/admin-edit.component';
import { AdminDetailsComponent } from './pages/user/layouts/admin/details/admin-details.component';
import { SupervisorOverviewComponent } from './pages/user/layouts/supervisor/overview/supervisor-overview.component';
import { SupervisorEditComponent } from './pages/user/layouts/supervisor/edit/supervisor-edit.component';
import { SupervisorAddComponent } from './pages/user/layouts/supervisor/add/supervisor-add.component';
import { SupervisorDetailsComponent } from './pages/user/layouts/supervisor/details/supervisor-details.component';
import { SecurityOverviewComponent } from './pages/user/layouts/security/overview/security-overview.component';
import { SecurityDetailsComponent } from './pages/user/layouts/security/details/security-details.component';
import { SecurityAddComponent } from './pages/user/layouts/security/add/security-add.component';
import { SecurityEditComponent } from './pages/user/layouts/security/edit/security-edit.component';
import { InternOverviewComponent } from './pages/user/layouts/interns/overview/intern-overview.component';
import { InternDetailsComponent } from './pages/user/layouts/interns/details/intern-details.component';
import { InternAddComponent } from './pages/user/layouts/interns/add/intern-add.component';
import { InternEditComponent } from './pages/user/layouts/interns/edit/intern-edit.component';
import { AssistancesRegisterComponent } from './pages/assitances/register/assistances-register.component';
import { AssistancesOverviewComponent } from './pages/assitances/overview/assistances-overview.component';
import { AssistancesOverviewTodayComponent } from './pages/assitances/overview/layouts/today/assistances-overview-today.component';
import { AssistancesOverviewMonthComponent } from './pages/assitances/overview/layouts/month/assistances-overview-month.component';
import { AssistancesOverviewWeekComponent } from './pages/assitances/overview/layouts/week/assistances-overview-week.component';
import { AreasOverviewComponent } from './pages/areas/overview/areas-overview.component';
import { AreasAddComponent } from './pages/areas/add/areas-add.component';
import { AreasEditComponent } from './pages/areas/edit/areas-edit.component';
import { AreasDetailsComponent } from './pages/areas/details/areas-details .component';
import { UniveristyOverviewComponent } from './pages/university/overview/univeristy-overview.component';
import { UniversityAddComponent } from './pages/university/add/university-add.component';
import { UniversityEditComponent } from './pages/university/edit/university-edit.component';
import { UniversityDetailsComponent } from './pages/university/details/university-details.component';
import { WorkAreasOverviewComponent } from './pages/work-areas/overview/work-areas-overview.component';
import { WorkAreasDetailsComponent } from './pages/work-areas/details/work-areas-details.component';
import { WorkAreasAddComponent } from './pages/work-areas/add/work-areas-add.component';
import { WorkAreasEditComponent } from './pages/work-areas/edit/work-areas-edit.component';
import { CertificatedOverviewComponent } from './pages/certificated/overview/certificated-overview.component';
import { CertificatedDetailsComponent } from './pages/certificated/details/certificated-details.component';
import { ProfileDetailsComponent } from './pages/profile/details/profile-details.component';
import { ProfileEditComponent } from './pages/profile/edit/profile-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AdminMainPageComponent,
    children: [
      {
        path: '', redirectTo: 'overview', pathMatch: 'full'
      },
      {
        path: 'overview', component: AdminOverviewPageComponent
      },
      {
        path: 'usuarios',
        component: AdminUserPageComponent,
        children: [
          {
            path: '', component: UserGeneralComponent
          },
          {
            path: 'administradores', component: AdminOverviewComponent,
          },
          {
            path: 'administradores/agregar', component: AdminAddComponent,
          },
          {
            path: 'administradores/:id', component: AdminDetailsComponent,
          },
          {
            path: 'administradores/:id/editar', component: AdminEditComponent,
          },
          {
            path: 'supervisores', component: SupervisorOverviewComponent,
          },
          {
            path: 'supervisores/agregar', component: SupervisorAddComponent,
          },
          {
            path: 'supervisores/:id', component: SupervisorDetailsComponent,
          },
          {
            path: 'supervisores/:id/editar', component: SupervisorEditComponent,
          },

          {
            path: 'seguridad', component: SecurityOverviewComponent,
          },
          {
            path: 'seguridad/1', component: SecurityDetailsComponent,
          },
          {
            path: 'seguridad/agregar', component: SecurityAddComponent,
          },
          {
            path: 'seguridad/:id/editar', component: SecurityEditComponent,
          },
          {
            path: 'practicantes', component: InternOverviewComponent,
          },
          {
            path: 'practicantes/1', component: InternDetailsComponent,
          },
          {
            path: 'practicantes/agregar', component: InternAddComponent,
          },
          {
            path: 'practicantes/:id/editar', component: InternEditComponent,
          }
        ]
      },
      {
        path: 'asistencias', component: AssistancesRegisterComponent,
      },
      {
        path: 'asistencias/overview',
        component: AssistancesOverviewComponent,
        children: [
          {
            path: '', component: AssistancesOverviewTodayComponent
          },
          {
            path: 'sem', component: AssistancesOverviewWeekComponent
          },
          {
            path: 'mes', component: AssistancesOverviewMonthComponent
          }
        ]
      },
      {
        path: 'areas',
        component: AreasOverviewComponent
      },
      {
        path: 'areas/agregar',
        component: AreasAddComponent
      },
      {
        path: 'areas/:id/editar',
        component: AreasEditComponent
      },
      {
        path: 'areas/:id',
        component: AreasDetailsComponent
      },
      {
        path: 'universidades',
        component: UniveristyOverviewComponent
      },
      {
        path: 'universidades/agregar',
        component: UniversityAddComponent
      },
      {
        path: 'universidades/:id/editar',
        component: UniversityEditComponent
      },
      {
        path: 'universidades/:id',
        component: UniversityDetailsComponent
      },
      {
        path: 'areas-laborales',
        component: WorkAreasOverviewComponent
      },
      {
        path: 'areas-laborales/agregar',
        component: WorkAreasAddComponent
      },
      {
        path: 'areas-laborales/:id/editar',
        component: WorkAreasEditComponent
      },
      {
        path: 'areas-laborales/:id',
        component: WorkAreasDetailsComponent
      },
      {
        path: 'certificados',
        component: CertificatedOverviewComponent
      },
      {
        path: 'certificados/:id',
        component: CertificatedDetailsComponent
      },
      {
        path: 'perfil/:id',
        component: ProfileDetailsComponent
      },
      {
        path: 'perfil/:id/editar',
        component: ProfileEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
