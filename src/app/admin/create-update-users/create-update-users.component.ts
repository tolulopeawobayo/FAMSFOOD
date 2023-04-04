import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EndPoints } from 'src/app/shared/constant';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import Swal from 'sweetalert2';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-create-update-users',
  templateUrl: './create-update-users.component.html',
  styleUrls: ['./create-update-users.component.css']
})
export class CreateUpdateUsersComponent implements OnInit {

  action: any = 'Create';
  errMsg: any = '';
  loading: boolean = false;
  isEdit: boolean = false;
  roles: any = [
    { "Id": 1, "roleName": "Admin" },
    { "Id": 2, "roleName": "Supervisor" }
  ];
  ContentForm = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    Email: new FormControl("", [Validators.required]),
    phoneNumber: new FormControl("", [Validators.required]),
    Gender: new FormControl("", [Validators.required]),
    Role: new FormControl("", [Validators.required]),
    Nationality: new FormControl("", [Validators.required]),
  });
  Loading = false;
  EndPoint = EndPoints.ADMIN;
  message: string = '';
  @Input() admin: any;
  @Output() status: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private adminService: AdminService, private router: Router,
    private ds: SharedDataService
  ) { }

  ngOnInit() {
    if (Object.keys(this.admin).length > 0) {
      this.ContentForm.patchValue(this.admin);
      this.isEdit = true;
    }
  }

  submit() {
    if (!this.isEdit) {
      this.Add();
    } else {
      this.Edit();
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

  Add() {
    this.loading = true;
    this.adminService.create(this.EndPoint + '/registerAdmin', this.ContentForm.value).subscribe(
      (res: any) => {
        if (res.status == true) {
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
      },
      (err: any) => {
        this.loading = false;
      }
    );
  }

  Edit() {
    this.loading = true;
    this.ContentForm.value['adminId'] = this.admin.Id;
    this.adminService.update(this.EndPoint + '/updateadmininfo', this.ContentForm.value).subscribe(
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
