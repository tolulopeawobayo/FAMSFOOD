import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EndPoints } from 'src/app/shared/constant';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-create-update-meal-order',
  templateUrl: './create-update-meal-order.component.html',
  styleUrls: ['./create-update-meal-order.component.css']
})
export class CreateUpdateMealOrderComponent implements OnInit {

  action: any = 'Create';
  errMsg: any = '';
  loading: boolean = false;
  isEdit: boolean = false;
  orders: any = [
    {
      "Id": 1, "mealId": 1, "mealName": "test", "mealPrice": 2000, "Description": "testttt", "UserId": 1, "Address": "2, Kofoworola strt, Akute",
      "quantityOrdered": 23, "isAvailable": true, "imageUrl": "https:deco.co"
    },
    {
      "Id": 2, "mealId": 2, "mealName": "test", "mealPrice": 2000, "Description": "testttt", "UserId": 1, "Address": "2, Kofoworola strt, Akute",
      "quantityOrdered": 23, "isAvailable": true, "imageUrl": "https:deco.co"
    },
    {
      "Id": 3, "mealId": 3, "mealName": "test", "mealPrice": 2000, "Description": "testttt", "UserId": 1, "Address": "2, Kofoworola strt, Akute",
      "quantityOrdered": 23, "isAvailable": true, "imageUrl": "https:deco.co"
    }
  ];
  ContentForm = new FormGroup({
    mealName: new FormControl("", [Validators.required]),
    Address: new FormControl("", [Validators.required]),
    mealPrice: new FormControl("", [Validators.required]),
    isAvailable: new FormControl("", [Validators.required]),
    quantityOrdered: new FormControl("", [Validators.required]),
    Description: new FormControl("", [Validators.required]),
    imageUrl: new FormControl("", [Validators.required]),
  });
  Loading = false;
  roles: any = [];
  userinfo: any
  EndPoint = EndPoints.ORDER;
  message: string = '';
  @Input() order: any;
  @Output() status: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private userService: UserService, private router: Router,
    private ds: SharedDataService
  ) { }

  ngOnInit() {
    this.userinfo = this.ds.getUser();
    if (Object.keys(this.order).length > 0) {
      this.ContentForm.patchValue(this.order);
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
    this.ContentForm.value['userId'] = this.userinfo.user.id;
    this.userService.create(this.EndPoint + '/submitorder', this.ContentForm.value).subscribe(
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
    this.ContentForm.value['userId'] = this.userinfo.user.id;
    this.ContentForm.value['Id'] = this.order.Id;
    this.userService.update(this.EndPoint + '/updateorder', this.ContentForm.value).subscribe(
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
