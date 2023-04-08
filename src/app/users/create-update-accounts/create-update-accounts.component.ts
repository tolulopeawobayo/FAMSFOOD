import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { EndPoints } from 'src/app/shared/constant';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-create-update-accounts',
  templateUrl: './create-update-accounts.component.html',
  styleUrls: ['./create-update-accounts.component.css']
})
export class CreateUpdateAccountsComponent implements OnInit {

  action: any = 'Create';
  errMsg: any = '';
  loading: boolean = false;
  isEdit: boolean = false;
  ContentForm = new FormGroup({
    userId: new FormControl("", [Validators.required]),
    Totalgrams: new FormControl("", [Validators.required]),
    subName: new FormControl("", [Validators.required]),
    subscriptionType: new FormControl("", [Validators.required]),
  });
  Loading = false;
  subscriptions: any = [];
  users: any = [];
  EndPoint = EndPoints.ACCOUNT;
  userinfo: any;
  message: string = '';
  @Input() account: any;
  @Output() status: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private userService: UserService, private router: Router,
    private ds: SharedDataService
  ) { }

  ngOnInit() {
    this.userinfo = this.ds.getUser();
    this.getUsers();
    if (Object.keys(this.account).length > 0) {
      this.ContentForm.patchValue(this.account);
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
    this.ContentForm.value['userId'] = this.userinfo.user.Id;
    this.userService.create(this.EndPoint + '/createaccount', this.ContentForm.value).subscribe(
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
    this.ContentForm.value['item_id'] = this.account.Id;
    this.ContentForm.value['userId'] = this.userinfo.user.Id;
    this.userService.update(this.EndPoint + '/updateaccount', this.ContentForm.value).subscribe(
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

  getUsers() {
    this.loading = true;
    this.userService.getAll(this.EndPoint + '/getalladmins').subscribe(
      (res: any) => {
        if (res) {
          this.users = res.data;
        }
        this.loading = false;
      },
      (err: any) => {
        this.loading = false;
      }
    );
  }

  getSubscriptions() {
    this.loading = true;
    this.userService.getAll(this.EndPoint + '/getallsubscriptions').subscribe(
      (res: any) => {
        if (res) {
          this.subscriptions = res.data;
        }
        this.loading = false;
      },
      (err: any) => {
        this.loading = false;
      }
    );
  }

}
