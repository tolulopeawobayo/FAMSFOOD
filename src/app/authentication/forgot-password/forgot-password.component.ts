import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/shared/shared-data.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  loading: boolean = false;
  errMsg!: string;
  statusMessage!: string;
  ForgotForm = new FormGroup({
    email: new FormControl("", [Validators.required])
  });
  Loading = false;
  roles: any = [];

  constructor(
    private authService: AuthService, private router: Router,
    private ds: SharedDataService
  ) { }

  ngOnInit() { }

  forgotPassword() {
    this.errMsg = "";
    this.loading = true;
    this.authService.forgotPassword(this.ForgotForm.value).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.loading = false;
          this.statusMessage = "Mail sent successfully.";
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
        this.errMsg = "Failed to send mail";
      }
    );
  }

}
