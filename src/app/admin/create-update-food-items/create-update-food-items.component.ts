import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EndPoints } from 'src/app/shared/constant';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { AdminService } from '../services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-update-food-items',
  templateUrl: './create-update-food-items.component.html',
  styleUrls: ['./create-update-food-items.component.css']
})
export class CreateUpdateFoodItemsComponent implements OnInit {

  action: any = 'Create';
  errMsg: any = '';
  loading: boolean = false;
  isEdit: boolean = false;
  ContentForm = new FormGroup({
    itemName: new FormControl("", [Validators.required]),
    itemCategory: new FormControl("", [Validators.required]),
    itemPrice: new FormControl("", [Validators.required]),
    currency: new FormControl("", [Validators.required]),
    weight: new FormControl("", [Validators.required]),
    available: new FormControl("", [Validators.required]),
    quantityAvailableInKG: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    imageUrl: new FormControl("", [Validators.required]),
  });
  Loading = false;
  roles: any = [];
  EndPoint = EndPoints.FOODITEM;
  message: string = '';
  @Input() fooditem: any;
  @Output() status: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private adminService: AdminService, private router: Router,
    private ds: SharedDataService
  ) { }

  ngOnInit() {
    if (Object.keys(this.fooditem).length > 0) {
      this.ContentForm.patchValue(this.fooditem);
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
    this.adminService.create(this.EndPoint + '/createfooditem', this.ContentForm.value).subscribe(
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
    this.ContentForm.value['item_id'] = this.fooditem.itemId;
    this.adminService.update(this.EndPoint + '/updatefooditem', this.ContentForm.value).subscribe(
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
