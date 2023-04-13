import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FulfilledOrdersComponent } from './fulfilled-orders/fulfilled-orders.component';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';
import { AccountsComponent } from './accounts/accounts.component';
import { MySubscriptionComponent } from './my-subscription/my-subscription.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [{
    path: '', component: UsersComponent, children: [
        { path: '', redirectTo: 'home', pathMatch: 'prefix' },
        { path: 'home', component: DashboardComponent },
        { path: 'fulfilled-order', component: FulfilledOrdersComponent },
        { path: 'pending-order', component: PendingOrdersComponent },
        { path: 'account', component: AccountsComponent },
        { path: 'my-subscription', component: MySubscriptionComponent },
        { path: 'my-profile', component: ProfileComponent },
    ]
}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
