import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

const routes: Routes = [{
    path: '', component: UsersComponent, children: [
        { path: '', redirectTo: 'home', pathMatch: 'prefix' },
        { path: 'home', component: NavBarComponent },
    ]
}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
