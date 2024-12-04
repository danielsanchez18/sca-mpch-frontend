import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminMainPageComponent } from './pages/main/main-page.component';
import { AdminOverviewPageComponent } from './pages/overview/overview-page.component';
import { SharedModule } from '../../shared/shared.module';
import { AdminUserPageComponent } from './pages/user/user-page.component';
import { UserGeneralComponent } from './pages/user/layouts/general/user-general.component';
import { AdminAddComponent } from './pages/user/layouts/admin/add/admin-add.component';
import { AdminOverviewComponent } from './pages/user/layouts/admin/overview/admin-overview.component';
import { AdminEditComponent } from './pages/user/layouts/admin/edit/admin-edit.component';
import { AdminDetailsComponent } from './pages/user/layouts/admin/details/admin-details.component';
import { SupervisorOverviewComponent } from './pages/user/layouts/supervisor/overview/supervisor-overview.component';
import { SupervisorAddComponent } from './pages/user/layouts/supervisor/add/supervisor-add.component';
import { SupervisorEditComponent } from './pages/user/layouts/supervisor/edit/supervisor-edit.component';
import { SupervisorDetailsComponent } from './pages/user/layouts/supervisor/details/supervisor-details.component';
import { SecurityOverviewComponent } from './pages/user/layouts/security/overview/security-overview.component';
import { SecurityAddComponent } from './pages/user/layouts/security/add/security-add.component';
import { SecurityDetailsComponent } from './pages/user/layouts/security/details/security-details.component';
import { SecurityEditComponent } from './pages/user/layouts/security/edit/security-edit.component';
import { InternAddComponent } from './pages/user/layouts/interns/add/intern-add.component';
import { InternOverviewComponent } from './pages/user/layouts/interns/overview/intern-overview.component';
import { InternEditComponent } from './pages/user/layouts/interns/edit/intern-edit.component';
import { InternDetailsComponent } from './pages/user/layouts/interns/details/intern-details.component';
import { AssistancesOverviewComponent } from './pages/assitances/overview/assistances-overview.component';
import { AssistancesRegisterComponent } from './pages/assitances/register/assistances-register.component';
import { AssistancesOverviewWeekComponent } from './pages/assitances/overview/layouts/week/assistances-overview-week.component';
import { AssistancesOverviewMonthComponent } from './pages/assitances/overview/layouts/month/assistances-overview-month.component';
import { AssistancesOverviewTodayComponent } from './pages/assitances/overview/layouts/today/assistances-overview-today.component';
import { AreasAddComponent } from './pages/areas/add/areas-add.component';
import { AreasOverviewComponent } from './pages/areas/overview/areas-overview.component';
import { AreasEditComponent } from './pages/areas/edit/areas-edit.component';
import { AreasDetailsComponent } from './pages/areas/details/areas-details .component';
import { UniveristyOverviewComponent } from './pages/university/overview/univeristy-overview.component';
import { UniversityAddComponent } from './pages/university/add/university-add.component';
import { UniversityEditComponent } from './pages/university/edit/university-edit.component';
import { UniversityDetailsComponent } from './pages/university/details/university-details.component';
import { WorkAreasOverviewComponent } from './pages/work-areas/overview/work-areas-overview.component';
import { WorkAreasAddComponent } from './pages/work-areas/add/work-areas-add.component';
import { WorkAreasEditComponent } from './pages/work-areas/edit/work-areas-edit.component';
import { WorkAreasDetailsComponent } from './pages/work-areas/details/work-areas-details.component';
import { CertificatedDetailsComponent } from './pages/certificated/details/certificated-details.component';
import { CertificatedOverviewComponent } from './pages/certificated/overview/certificated-overview.component';
import { ProfileDetailsComponent } from './pages/profile/details/profile-details.component';
import { ProfileEditComponent } from './pages/profile/edit/profile-edit.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../../core/interceptors/auth.interceptor';



@NgModule({
  declarations: [
    AdminMainPageComponent,

    AdminOverviewPageComponent,

    AdminUserPageComponent,
    UserGeneralComponent,

    AdminOverviewComponent,
    AdminAddComponent,
    AdminEditComponent,
    AdminDetailsComponent,

    SupervisorOverviewComponent,
    SupervisorAddComponent,
    SupervisorEditComponent,
    SupervisorDetailsComponent,

    SecurityOverviewComponent,
    SecurityAddComponent,
    SecurityEditComponent,
    SecurityDetailsComponent,

    InternOverviewComponent,
    InternAddComponent,
    InternEditComponent,
    InternDetailsComponent,

    AssistancesOverviewComponent,
    AssistancesOverviewTodayComponent,
    AssistancesOverviewWeekComponent,
    AssistancesOverviewMonthComponent,
    AssistancesRegisterComponent,

    AreasOverviewComponent,
    AreasAddComponent,
    AreasEditComponent,
    AreasDetailsComponent,

    UniveristyOverviewComponent,
    UniversityAddComponent,
    UniversityEditComponent,
    UniversityDetailsComponent,

    WorkAreasOverviewComponent,
    WorkAreasAddComponent,
    WorkAreasEditComponent,
    WorkAreasDetailsComponent,

    CertificatedOverviewComponent,
    CertificatedDetailsComponent,

    ProfileDetailsComponent,
    ProfileEditComponent

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AdminAddComponent]
})
export class AdminModule { }
