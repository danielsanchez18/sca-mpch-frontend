import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupervisorRoutingModule } from './supervisor-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SupervisorMainPageComponent } from './pages/main/main-page.component';
import { SupervisorOverviewPageComponent } from './pages/overview/overview-page.component';
import { SharedModule } from '../../shared/shared.module';
import { SidebarSupervisorComponent } from './components/sidebar-supervisor/sidebar-supervisor.component';
import { SupervisorInternDetailsComponent } from './pages/interns/details/intern-details.component';
import { SupervisorInternOverviewComponent } from './pages/interns/overview/intern-overview.component';
import { SupervisorAssistancesOverviewWeekComponent } from './pages/assistances/overview/layouts/week/assistances-overview-week.component';
import { SupervisorAssistancesOverviewTodayComponent } from './pages/assistances/overview/layouts/today/assistances-overview-today.component';
import { SupervisorAssistancesOverviewMonthComponent } from './pages/assistances/overview/layouts/month/assistances-overview-month.component';
import { SupervisorAssistancesOverviewComponent } from './pages/assistances/overview/assistances-overview.component';
import { SupervisorAreasDetailsComponent } from './pages/areas/details/areas-details .component';
import { SupervisorAreasOverviewComponent } from './pages/areas/overview/areas-overview.component';
import { SupervisorUniveristyOverviewComponent } from './pages/university/overview/univeristy-overview.component';
import { SupervisorUniversityDetailsComponent } from './pages/university/details/university-details.component';
import { SupervisorProfileDetailsComponent } from './pages/profile/details/profile-details.component';


@NgModule({
  declarations: [
    SidebarSupervisorComponent,
    SupervisorMainPageComponent,

    SupervisorOverviewPageComponent,

    SupervisorInternDetailsComponent,
    SupervisorInternOverviewComponent,

    SupervisorAssistancesOverviewComponent,
    SupervisorAssistancesOverviewTodayComponent,
    SupervisorAssistancesOverviewWeekComponent,
    SupervisorAssistancesOverviewMonthComponent,

    SupervisorAreasDetailsComponent,
    SupervisorAreasOverviewComponent,

    SupervisorUniveristyOverviewComponent,
    SupervisorUniversityDetailsComponent,
    SupervisorProfileDetailsComponent

  ],
  imports: [
    CommonModule,
    SupervisorRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule
  ]
})
export class SupervisorModule { }
