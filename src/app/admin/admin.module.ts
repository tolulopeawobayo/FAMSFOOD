import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './users/users.component';
import { UpdateUsersComponent } from './update-users/update-users.component';
import { UpdateAdminUsersComponent } from './update-admin-users/update-admin-users.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { MealComponent } from './meal/meal.component';
import { CreateUpdateMealComponent } from './create-update-meal/create-update-meal.component';
import { CreateUpdateSubscriptionComponent } from './create-update-subscription/create-update-subscription.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { CreateUpdateFoodItemsComponent } from './create-update-food-items/create-update-food-items.component';
import { FoodItemsComponent } from './food-items/food-items.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule } from '@angular/forms';
import { CreateUpdateUsersComponent } from './create-update-users/create-update-users.component';
import { MealScheduleComponent } from './meal-schedule/meal-schedule.component';
import { RolesComponent } from './roles/roles.component';
import { CreateUpdateRoleComponent } from './create-update-role/create-update-role.component';
import { CreateUpdateMealScheduleComponent } from './create-update-meal-schedule/create-update-meal-schedule.component';
import { OrdersComponent } from './orders/orders.component';
import { AccountsComponent } from './accounts/accounts.component';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';
import { FulfilledOrdersComponent } from './fulfilled-orders/fulfilled-orders.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { CreateUpdateAccountsComponent } from './create-update-accounts/create-update-accounts.component';
import { CreateUpdateMealOrderComponent } from './create-update-meal-order/create-update-meal-order.component';

@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    UpdateUsersComponent,
    UpdateAdminUsersComponent,
    AdminUsersComponent,
    MealComponent,
    CreateUpdateMealComponent,
    CreateUpdateSubscriptionComponent,
    SubscriptionComponent,
    CreateUpdateFoodItemsComponent,
    FoodItemsComponent,
    NavBarComponent,
    DashboardComponent,
    CreateUpdateUsersComponent,
    MealScheduleComponent,
    RolesComponent,
    CreateUpdateRoleComponent,
    CreateUpdateMealScheduleComponent,
    OrdersComponent,
    AccountsComponent,
    PendingOrdersComponent,
    FulfilledOrdersComponent,
    AllOrdersComponent,
    CreateUpdateAccountsComponent,
    CreateUpdateMealOrderComponent
  ],
  imports: [
    CommonModule, AdminRoutingModule, MaterialModule, FormsModule
  ],
  entryComponents: [CreateUpdateFoodItemsComponent]
})
export class AdminModule { }
