import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { LocalDatePipe } from './pipes/local-date.pipe';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    LocalDatePipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    LocalDatePipe
  ]
})
export class SharedModule { }
