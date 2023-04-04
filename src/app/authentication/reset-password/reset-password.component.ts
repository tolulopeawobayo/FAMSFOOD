import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/shared/shared-data.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  loading: boolean = false;
  errMsg!: string;
  statusMessage!: string;
  ResetForm = new FormGroup({
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    otp: new FormControl("", [Validators.required]),
  });
  Loading = false;
  roles: any = [];

  constructor(
    private authService: AuthService, private router: Router,
    private ds: SharedDataService
  ) { }

  ngOnInit() { }

  resetForm() {
    this.errMsg = "";
    this.loading = true;
    //call the service and submit credentials
    this.authService.resetPassword(this.ResetForm.value).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.loading = false;
          this.statusMessage = "Password reset successful.";
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
        this.errMsg = "";
      }
    );
  }

}
