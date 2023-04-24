import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountsComponent } from './accounts/accounts.component';
import { MySubscriptionComponent } from './my-subscription/my-subscription.component';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './orders/orders.component';
import { MealDetailsComponent } from './meal-details/meal-details.component';

const routes: Routes = [{
    path: '', component: UsersComponent, children: [
        { path: '', redirectTo: 'home', pathMatch: 'prefix' },
        { path: 'home', component: DashboardComponent },
        { path: 'orders', component: OrdersComponent },
        { path: 'account', component: AccountsComponent },
        { path: 'my-subscription', component: MySubscriptionComponent },
        { path: 'my-profile', component: ProfileComponent },
        { path: 'meal-details', component: MealDetailsComponent },
    ]
}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
