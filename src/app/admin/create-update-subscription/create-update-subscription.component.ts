import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EndPoints } from 'src/app/shared/constant';
import Swal from 'sweetalert2';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-update-subscription',
  templateUrl: './create-update-subscription.component.html',
  styleUrls: ['./create-update-subscription.component.css']
})
export class CreateUpdateSubscriptionComponent implements OnInit {

  action: any = 'Create';
  errMsg: any = '';
  loading: boolean = false;
  isEdit: boolean = false;
  ContentForm = new FormGroup({
    subscriptionName: new FormControl("", [Validators.required]),
    subDuration: new FormControl("", [Validators.required]),
    totalWeight: new FormControl("", [Validators.required]),
    Price: new FormControl("", [Validators.required]),
  });
  Loading = false;
  roles: any = [];
  EndPoint = EndPoints.SUBSCRIPTION;
  message: string = '';
  @Input() subscription: any;
  @Output() status: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private adminService: AdminService, private router: Router,
    private ds: SharedDataService
  ) { }

  ngOnInit() {
    if (Object.keys(this.subscription).length > 0) {
      this.ContentForm.patchValue(this.subscription);
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
    this.adminService.create(this.EndPoint + '/createsubplan', this.ContentForm.value).subscribe(
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
    this.ContentForm.value['item_id'] = this.subscription.Id;
    this.adminService.update(this.EndPoint + '/updatesubplan', this.ContentForm.value).subscribe(
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
