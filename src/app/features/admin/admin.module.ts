import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminMainPageComponent } from './pages/main/main-page.component';
import { AdminUniversitiesOverviewComponent } from './pages/universities/overview/universities-overview.component';
import { AdminOverviewPageComponent } from './pages/overview/overview-page.component';
import { AdminProfilePageComponent } from './pages/profile/profile-page.component';
import { AdminSidebarComponent } from './components/sidebar/sidebar.component';
import { SharedModule } from '../../shared/shared.module';
import { AdminMetricsOverviewComponent } from './pages/overview/layouts/metrics/metrics-overview.component';
import { AdminStatsOverviewComponent } from './pages/overview/layouts/stats/stats-overview.component';
import { AdminUniversitiesAddComponent } from './pages/universities/add/universities-add.component';
import { AdminUniversitiesEditComponent } from './pages/universities/edit/universities-edit.component';
import { AdminUniversitiesDetailsComponent } from './pages/universities/details/universities-details.component';
import { AdminInternsOverviewComponent } from './pages/interns/overview/interns-overview.component';
import { AdminInternsAddComponent } from './pages/interns/add/interns-add.component';
import { AdminInternsEditComponent } from './pages/interns/edit/interns-edit.component';
import { AdminInternsDetailsComponent } from './pages/interns/details/interns-details.component';
import { AdminAssistancesDetailsComponent } from './pages/assistances/details/assistances-details.component';
import { AdminAssistancesOverviewComponent } from './pages/assistances/overview/assistances-overview.component';
import { AdminAreasAddComponent } from './pages/areas/add/areas-add.component';
import { AdminAreasOverviewComponent } from './pages/areas/overview/areas-overview.component';
import { AdminAreasEditComponent } from './pages/areas/edit/areas-edit.component';
import { AdminAreasDetailsComponent } from './pages/areas/details/areas-details.component';
import { AdminUsersOverviewComponent } from './pages/users/overview/users-overview.component';
import { AdminUsersAddComponent } from './pages/users/add/users-add.component';
import { AdminUsersEditComponent } from './pages/users/edit/users-edit.component';
import { AdminUsersDetailsComponent } from './pages/users/details/users-details.component';
import { AdminCertificatesOverviewComponent } from './pages/certificates/overview/certificates-overview.component';
import { AdminCertificatesAddComponent } from './pages/certificates/add/certificates-add.component';


@NgModule({
  declarations: [
    AdminMainPageComponent,

    AdminUniversitiesOverviewComponent,
    AdminUniversitiesAddComponent,
    AdminUniversitiesEditComponent,
    AdminUniversitiesDetailsComponent,

    AdminProfilePageComponent,
    AdminSidebarComponent,

    AdminOverviewPageComponent,
    AdminMetricsOverviewComponent,
    AdminStatsOverviewComponent,

    AdminInternsOverviewComponent,
    AdminInternsAddComponent,
    AdminInternsEditComponent,
    AdminInternsDetailsComponent,

    AdminAssistancesOverviewComponent,
    AdminAssistancesDetailsComponent,
    AdminAssistancesOverviewComponent,

    AdminAreasAddComponent,
    AdminAreasOverviewComponent,
    AdminAreasEditComponent,
    AdminAreasDetailsComponent,

    AdminUsersOverviewComponent,
    AdminUsersAddComponent,
    AdminUsersEditComponent,
    AdminUsersDetailsComponent,

    AdminCertificatesAddComponent,
    AdminCertificatesOverviewComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
