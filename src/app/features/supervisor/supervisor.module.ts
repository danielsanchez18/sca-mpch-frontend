import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupervisorRoutingModule } from './supervisor-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SupervisorMainPageComponent } from './pages/main/main-page.component';
import { SupervisorOverviewPageComponent } from './pages/overview/overview-page.component';
import { SharedModule } from '../../shared/shared.module';
import { SidebarSupervisorComponent } from './components/sidebar-supervisor/sidebar-supervisor.component';


@NgModule({
  declarations: [
    SidebarSupervisorComponent,
    SupervisorMainPageComponent,

    SupervisorOverviewPageComponent,

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
