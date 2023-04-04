import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EndPoints } from 'src/app/shared/constant';
import Swal from 'sweetalert2';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/shared/shared-data.service';

@Component({
  selector: 'app-create-update-meal-schedule',
  templateUrl: './create-update-meal-schedule.component.html',
  styleUrls: ['./create-update-meal-schedule.component.css']
})
export class CreateUpdateMealScheduleComponent implements OnInit {

  action: any = 'Create';
  errMsg: any = '';
  loading: boolean = false;
  isEdit: boolean = false;
  ContentForm = new FormGroup({
    userId: new FormControl("", [Validators.required]),
    day: new FormControl("", [Validators.required]),
    Meals: new FormControl("", [Validators.required]),
  });
  Loading = false;
  meals: any = [];
  users: any = [];
  EndPoint = EndPoints.SCHEDULE;
  message: string = '';
  @Input() schedule: any;
  @Output() status: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private adminService: AdminService, private router: Router,
    private ds: SharedDataService
  ) { }

  ngOnInit() {
    this.getUsers();
    this.getMeals();
    if (Object.keys(this.schedule).length > 0) {
      this.ContentForm.patchValue(this.schedule);
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
    this.ContentForm.value['byUser'] = false;
    this.adminService.create(this.EndPoint + '/createschedule', this.ContentForm.value).subscribe(
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
    this.ContentForm.value['byUser'] = false;
    this.ContentForm.value['item_id'] = this.schedule.Id;
    this.adminService.update(this.EndPoint + '/updateschedule', this.ContentForm.value).subscribe(
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

  getMeals() {
    this.loading = true;
    this.adminService.getAll(this.EndPoint + '/getallmeal').subscribe(
      (res: any) => {
        if (res) {
          this.meals = res.data;
        }
        this.loading = false;
      },
      (err: any) => {
        this.loading = false;
      }
    );
  }

  getUsers() {
    this.loading = true;
    this.adminService.getAll(this.EndPoint + '/getalladmins').subscribe(
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

}
