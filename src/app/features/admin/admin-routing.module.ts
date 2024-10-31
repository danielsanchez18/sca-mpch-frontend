import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMainPageComponent } from './pages/main/main-page.component';
import { AdminOverviewPageComponent } from './pages/overview/overview-page.component';
import { AdminUniversitiesOverviewComponent } from './pages/universities/overview/universities-overview.component';
import { AdminUniversitiesAddComponent } from './pages/universities/add/universities-add.component';
import { AdminUniversitiesEditComponent } from './pages/universities/edit/universities-edit.component';
import { AdminUniversitiesDetailsComponent } from './pages/universities/details/universities-details.component';
import { AdminInternsAddComponent } from './pages/interns/add/interns-add.component';
import { AdminInternsEditComponent } from './pages/interns/edit/interns-edit.component';
import { AdminInternsDetailsComponent } from './pages/interns/details/interns-details.component';
import { AdminInternsOverviewComponent } from './pages/interns/overview/interns-overview.component';
import { AdminAssistancesOverviewComponent } from './pages/assistances/overview/assistances-overview.component';
import { AdminAssistancesAddComponent } from './pages/assistances/add/assistances-add.component';
import { AdminAssistancesDetailsComponent } from './pages/assistances/details/assistances-details.component';
import { AdminAreasOverviewComponent } from './pages/areas/overview/areas-overview.component';
import { AdminAreasAddComponent } from './pages/areas/add/areas-add.component';
import { AdminAreasEditComponent } from './pages/areas/edit/areas-edit.component';
import { AdminAreasDetailsComponent } from './pages/areas/details/areas-details.component';
import { AdminUsersOverviewComponent } from './pages/users/overview/users-overview.component';
import { AdminUsersAddComponent } from './pages/users/add/users-add.component';
import { AdminUsersEditComponent } from './pages/users/edit/users-edit.component';
import { AdminUsersDetailsComponent } from './pages/users/details/users-details.component';
import { AdminCertificatesOverviewComponent } from './pages/certificates/overview/certificates-overview.component';
import { AdminCertificatesAddComponent } from './pages/certificates/add/certificates-add.component';

const routes: Routes = [
  {
    path: '',
    component: AdminMainPageComponent,
    children: [
      {
        path: '', component: AdminOverviewPageComponent
      },
      {
        path: 'universidad',
        children: [
          {
            path: 'overview', component: AdminUniversitiesOverviewComponent
          },
          {
            path: 'agregar', component: AdminUniversitiesAddComponent
          },
          {
            path: 'editar/:id', component: AdminUniversitiesEditComponent
          },
          {
            path: ':idUniversity', component: AdminUniversitiesDetailsComponent
          }

        ]
      },
      {
        path: 'areas',
        children: [
          {
            path: '', redirectTo: 'overview', pathMatch: 'full'
          },
          {
            path: 'overview', component: AdminAreasOverviewComponent
          },
          {
            path: 'editar/:id', component: AdminAreasEditComponent
          },
          {
            path: 'agregar', component: AdminAreasAddComponent
          },
          {
            path: ':idArea', component: AdminAreasDetailsComponent
          }

        ]
      },
      {
        path: 'certificados',
        children: [
          {
            path: '', redirectTo: 'overview', pathMatch: 'full'
          },
          {
            path: 'overview', component: AdminCertificatesOverviewComponent
          },
          {
            path: 'generar', component: AdminCertificatesAddComponent
          }
        ]
      },
      {
        path: 'practicante',
        children: [
          {
            path: 'overview', component: AdminInternsOverviewComponent
          },
          {
            path: 'agregar', component: AdminInternsAddComponent
          },
          {
            path: 'editar/:idIntern', component: AdminInternsEditComponent
          },
          {
            path: ':idIntern', component: AdminInternsDetailsComponent
          }

        ]
      },
      {
        path: 'asistencias',
        children: [
          {
            path: 'overview', component: AdminAssistancesOverviewComponent
          },
          {
            path: 'registrar', component: AdminAssistancesAddComponent
          },
          {
            path: ':id', component: AdminAssistancesDetailsComponent
          }

        ]
      },
      {
        path: 'usuario',
        children: [
          {
            path: 'overview', component: AdminUsersOverviewComponent
          },
          {
            path: 'agregar', component: AdminUsersAddComponent
          },
          {
            path: 'editar/:id', component: AdminUsersEditComponent
          },
          {
            path: ':id', component: AdminUsersDetailsComponent
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
export class AdminRoutingModule { }
