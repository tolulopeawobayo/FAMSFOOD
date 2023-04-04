import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminComponent } from './admin.component';
import { FoodItemsComponent } from './food-items/food-items.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MealComponent } from './meal/meal.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { MealScheduleComponent } from './meal-schedule/meal-schedule.component';
import { OrdersComponent } from './orders/orders.component';
import { AccountsComponent } from './accounts/accounts.component';

const routes: Routes = [
    {
        path: '', component: AdminComponent, children: [
            { path: '', redirectTo: 'home', pathMatch: 'prefix' },
            { path: 'home', component: DashboardComponent },
            { path: 'admin-user', component: AdminUsersComponent },
            { path: 'user', component: UsersComponent },
            { path: 'food', component: FoodItemsComponent },
            { path: 'meal', component: MealComponent },
            { path: 'meal-schedule', component: MealScheduleComponent },
            { path: 'role', component: RolesComponent },
            { path: 'subscription', component: SubscriptionComponent },
            { path: 'orders', component: OrdersComponent },
            { path: 'account', component: AccountsComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
