import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '', component: AuthenticationComponent, children: [
      { path: '', redirectTo: 'login', pathMatch: 'prefix' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterUserComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent }
    ]
  }
];

@NgModule({
  declarations: [
    AuthenticationComponent,
    LoginComponent,
    RegisterUserComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes), MaterialModule, FormsModule
  ]
})
export class AuthenticationModule { }
