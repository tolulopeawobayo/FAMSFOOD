import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    UsersComponent,
    NavBarComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule, UsersRoutingModule
  ]
})
export class UsersModule { }
