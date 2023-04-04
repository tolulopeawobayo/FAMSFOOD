import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./authentication/authentication.module').then(module => module.AuthenticationModule) },
  { path: 'app/user', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'app/admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
];
//, { enableTracing: true }

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
