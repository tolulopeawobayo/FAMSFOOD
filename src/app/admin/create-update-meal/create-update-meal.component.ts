import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EndPoints } from 'src/app/shared/constant';
import Swal from 'sweetalert2';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/shared/shared-data.service';

@Component({
  selector: 'app-create-update-meal',
  templateUrl: './create-update-meal.component.html',
  styleUrls: ['./create-update-meal.component.css']
})
export class CreateUpdateMealComponent implements OnInit {

  action: any = 'Create';
  errMsg: any = '';
  loading: boolean = false;
  isEdit: boolean = false;
  fooditems: any = [
    {
      "itemId": 1, "itemName": "test", "itemPrice": 2000, "Description": "testttt", "Currency": "$", "itemCategory": "trial,",
      "Weight": 3094, "quantityAvailable": 23, "isAvailable": true, "imageUrl": "https:deco.co"
    },
    {
      "itemId": 2, "itemName": "test", "itemPrice": 2000, "Description": "testttt", "Currency": "$", "itemCategory": "trial,",
      "Weight": 3094, "quantityAvailable": 23, "isAvailable": true, "imageUrl": "https:deco.co"
    },
    {
      "itemId": 3, "itemName": "test", "itemPrice": 2000, "Description": "testttt", "Currency": "$", "itemCategory": "trial,",
      "Weight": 3094, "quantityAvailable": 23, "isAvailable": true, "imageUrl": "https:deco.co"
    }
  ];
  ContentForm = new FormGroup({
    mealName: new FormControl("", [Validators.required]),
    FoodItems: new FormControl("", [Validators.required]),
    mealPrice: new FormControl("", [Validators.required]),
    isAvailable: new FormControl("", [Validators.required]),
    quantityAvailable: new FormControl("", [Validators.required]),
    Description: new FormControl("", [Validators.required]),
    imageUrl: new FormControl("", [Validators.required]),
  });
  Loading = false;
  roles: any = [];
  EndPoint = EndPoints.MEAL;
  message: string = '';
  @Input() meal: any;
  @Output() status: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private adminService: AdminService, private router: Router,
    private ds: SharedDataService
  ) { }

  ngOnInit() {
    if (Object.keys(this.meal).length > 0) {
      this.ContentForm.patchValue(this.meal);
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

  getFoodItemsObject(e: any) {
    const x = this.fooditems.find(c => c.itemId == e.value);
    console.log(x);
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
    this.adminService.create(this.EndPoint + '/createmeal', this.ContentForm.value).subscribe(
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
    this.ContentForm.value['mealId'] = this.meal.Id;
    this.adminService.update(this.EndPoint + '/updatemeal', this.ContentForm.value).subscribe(
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
