import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';
import { FulfilledOrdersComponent } from './fulfilled-orders/fulfilled-orders.component';
import { CreateUpdateMealOrderComponent } from './create-update-meal-order/create-update-meal-order.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule } from '@angular/forms';
import { AccountsComponent } from './accounts/accounts.component';
import { CreateUpdateAccountsComponent } from './create-update-accounts/create-update-accounts.component';
import { MySubscriptionComponent } from './my-subscription/my-subscription.component';
import { StatusMessageComponent } from './status-message/status-message.component';
import { ProfileComponent } from './profile/profile.component';
import { MealItemsComponent } from './meal-items/meal-items.component';



@NgModule({
  declarations: [
    UsersComponent, PendingOrdersComponent, FulfilledOrdersComponent, CreateUpdateMealOrderComponent,
    NavBarComponent, AccountsComponent, CreateUpdateAccountsComponent, StatusMessageComponent,
    DashboardComponent,
    MySubscriptionComponent,
    ProfileComponent,
    MealItemsComponent
  ],
  imports: [
    CommonModule, UsersRoutingModule, MaterialModule, FormsModule
  ]
})
export class UsersModule { }
