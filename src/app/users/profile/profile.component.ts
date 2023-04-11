import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EndPoints } from 'src/app/shared/constant';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  action: any = 'Create';
  errMsg: any = '';
  loading: boolean = false;
  isEdit: boolean = false;
  roles: any = [
    { "Id": 1, "roleName": "Admin" },
    { "Id": 2, "roleName": "Supervisor" }
  ];
  countries: any = [];
  ContentForm = new FormGroup({
    userName: new FormControl("", [Validators.required]),
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    Email: new FormControl("", [Validators.required]),
    phoneNumber: new FormControl("", [Validators.required]),
    Gender: new FormControl("", [Validators.required]),
    // Role: new FormControl("", [Validators.required]),
    // Nationality: new FormControl("", [Validators.required]),
  });
  Loading = false;
  EndPoint = EndPoints.USER;
  url = EndPoints.ROLE;
  api = EndPoints.GENERAL;
  message: string = '';
  user: any;
  @Output() status: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private userService: UserService, private router: Router,
    private ds: SharedDataService
  ) { }

  ngOnInit() {
    this.user = this.ds.getUser();
    if (Object.keys(this.user.user).length > 0) {
      this.ContentForm.patchValue(this.user.user);
      this.isEdit = true;
    }
  }

  opensweetalert(message: string) {
    Swal.fire({
      icon: 'success',
      text: message
    });
  }

  opensweetalert1() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong',
    });
  }

  opensweetalert2(icon: any, message: any) {
    Swal.fire({
      icon: icon,
      text: message
    });
  }

  getRoles() {
    this.loading = true;
    this.userService.getAll(this.url + '/getallroles').subscribe(
      (res: any) => {
        if (res) {
          this.roles = res.data;
        }
        this.loading = false;
      },
      (err: any) => {
        this.loading = false;
      }
    );
  }

  getCountries() {
    this.loading = true;
    this.userService.getAll(this.api + '/getcountries').subscribe(
      (res: any) => {
        if (res) {
          this.countries = res.data;
        }
        this.loading = false;
      },
      (err: any) => {
        this.loading = false;
      }
    );
  }

  Edit() {
    this.loading = true;
    this.ContentForm.value['userId'] = this.user.user.Id;
    this.userService.update(this.EndPoint + '/updateadmininfo', this.ContentForm.value).subscribe(
      res => {
        if (res.status === true) {
          this.loading = false;
          this.message = 'Successful';
          this.opensweetalert(this.message);
          this.status.emit(true);
        } else {
          this.opensweetalert1();
          this.loading = false;
        }
        this.loading = false;
        const icon = (res.status == true) ? 'success' : 'error';
        this.opensweetalert2(icon, res.message);
        this.status.emit(true);
      }, err => {
        this.loading = false;
      }
    );

  }

}
