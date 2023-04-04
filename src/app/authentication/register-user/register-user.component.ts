import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  loading: boolean = false;
  errMsg!: string;
  statusMessage!: string;
  RegisterForm = new FormGroup({
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    username: new FormControl("", [Validators.required]),
    phoneNumber: new FormControl("", [Validators.required]),
  });
  Loading = false;
  roles: any = [];

  constructor(
    private authService: AuthService, private router: Router,
    private ds: SharedDataService
  ) { }

  ngOnInit() { }

  register() {
    this.errMsg = "";
    this.loading = true;
    this.RegisterForm.value['isValidated'] = 0;
    //call the service and submit credentials
    this.authService.register(this.RegisterForm.value).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.ds.keepData("token", JSON.stringify(res.data.Token));
          this.ds.persistData("userinfo", JSON.stringify(res.data));
          this.loading = false;
          this.statusMessage = "Registration Successful. Kindly check your mail to activate your account....";
          this.router.navigateByUrl('/login');
          this.router.navigateByUrl('/refresh', { skipLocationChange: true }).then(() => {
            this.router.navigateByUrl('/login');
          });
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
