import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { SecurityMainPageComponent } from './pages/main/main-page.component';
import { SecurityOverviewPageComponent } from './pages/overview/overview-page.component';
import { SharedModule } from '../../shared/shared.module';
import { SecurityAssistancesRegisterComponent } from './pages/assistances/register/assistances-register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SecurityAssistancesOverviewTodayComponent } from './pages/assistances/overview/layouts/today/assistances-overview-today.component';
import { SecurityAssistancesOverviewComponent } from './pages/assistances/overview/assistances-overview.component';
import { SecurityAssistancesOverviewMonthComponent } from './pages/assistances/overview/layouts/month/assistances-overview-month.component';
import { SecurityAssistancesOverviewWeekComponent } from './pages/assistances/overview/layouts/week/assistances-overview-week.component';
import { SecurityCertificatedOverviewComponent } from './pages/certificated/overview/certificated-overview.component';
import { SecurityInternOverviewComponent } from './pages/interns/overview/intern-overview.component';
import { SecurityInternDetailsComponent } from './pages/interns/details/intern-details.component';
import { SecurityProfileEditComponent } from './pages/profile/edit/profile-edit.component';
import { SecurityProfileDetailsComponent } from './pages/profile/details/profile-details.component';

@NgModule({
  declarations: [
    SecurityMainPageComponent,
    SecurityOverviewPageComponent,

    SecurityAssistancesRegisterComponent,
    SecurityAssistancesOverviewComponent,
    SecurityAssistancesOverviewTodayComponent,
    SecurityAssistancesOverviewMonthComponent,
    SecurityAssistancesOverviewWeekComponent,

    SecurityCertificatedOverviewComponent,

    SecurityInternOverviewComponent,
    SecurityInternDetailsComponent,

    SecurityProfileDetailsComponent,
    SecurityProfileEditComponent
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule
  ]
})
export class SecurityModule { }
