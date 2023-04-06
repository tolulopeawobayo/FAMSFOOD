import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;
  errMsg!: string;
  statusMessage!: string;
  LoginForm = new FormGroup({
    userName: new FormControl("", [Validators.required]),
    userPassword: new FormControl("", [Validators.required]),
  });
  Loading = false;
  roles: any = [];

  constructor(
    private authService: AuthService, private router: Router,
    private ds: SharedDataService
  ) { }

  ngOnInit() { }

  login() {
    this.errMsg = "";
    this.loading = true;
    //call the service and submit credentials
    this.authService.login(this.LoginForm.value).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.ds.keepData("token", JSON.stringify(res.data.jwtToken));
          this.ds.persistData("userinfo", JSON.stringify(res.data));
          this.loading = false;
          this.statusMessage = "Login Successful. Setting up your account....";
          this.router.navigateByUrl('/app/admin/home');
          // this.router.navigateByUrl('/refresh', { skipLocationChange: true }).then(() => {
          //   this.router.navigateByUrl('/app/admin/home');
          // });
        } else {
          this.errMsg = res.errors;
        }
        this.loading = false;
      },
      (err: any) => {
        this.loading = false;
        this.errMsg = "username or password is incorrect";
      }
    );
  }

}
