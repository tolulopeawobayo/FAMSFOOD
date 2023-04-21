import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CreateUpdateMealComponent } from '../create-update-meal/create-update-meal.component';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../services/admin.service';
import { EndPoints } from 'src/app/shared/constant';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {

  meals: any = [
    {
      "Id": 1, "mealId": 1, "mealName": "test", "mealPrice": 2000, "Description": "testttt", "Fooditems": [],
      "quantityAvailable": 23, "isAvailable": true, "imageUrl": "https:deco.co"
    },
    {
      "Id": 2, "mealId": 2, "mealName": "test", "mealPrice": 2000, "Description": "testttt", "Fooditems": [],
      "quantityAvailable": 23, "isAvailable": false, "imageUrl": "https:deco.co"
    },
    {
      "Id": 3, "mealId": 3, "mealName": "test", "mealPrice": 2000, "Description": "testttt", "Fooditems": [],
      "quantityAvailable": 23, "isAvailable": true, "imageUrl": "https:deco.co"
    }
  ];
  loading: boolean = false;
  endpoint = EndPoints.MEAL;
  Error: boolean = false;
  ErrorMessage: string = '';

  constructor(private ds: SharedDataService, private dialog: MatDialog, private adminService: AdminService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.adminService.getAll(this.endpoint + '/getallmeals').subscribe(
      res => {
        if (res) {
          this.meals = res.data;
          //  this.dataSource.paginator = this.paginator;
          //this.dataSource.sort = this.sort;
          this.loading = false;
        } else {
          this.ErrorMessage = res.message;
          this.loading = false;
        }
      },
      err => {
        this.Error = true;
        this.ErrorMessage = "Could not connect to server, try again later.";
        this.loading = false;
      }
    );
  }

  makeMealAvailable(e: any, mealId: any) {
    console.log(e.target.value, mealId);
    const meal = { "mealId": mealId }
    if (e.target.value == "true") {
      this.adminService.create(this.endpoint + '/makemealunavailable', meal).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.loading = false;
            Swal.fire(
              'Success!',
              'Meal successfully made unavailable.',
              'success'
            )
          } else {
            this.loading = false;
            Swal.fire(
              'Error!',
              'Unsuccessful, please try again later.',
              'error'
            )
          }
          this.loading = false;
          const icon = (res.status == true) ? 'success' : 'error';
          Swal.fire({
            icon: icon,
            title: icon,
            text: res.message,
          })
        },
        (err: any) => {
          this.loading = false;
        }
      );
    } else {
      this.adminService.create(this.endpoint + '/makemealavailable', meal).subscribe(
        (res: any) => {
          if (res.status == true) {
            this.loading = false;
            Swal.fire(
              'Success!',
              'Meal successfully made available.',
              'success'
            )
          } else {
            this.loading = false;
            Swal.fire(
              'Error!',
              'Delete not successful, please try again later.',
              'error'
            )
          }
          this.loading = false;
          const icon = (res.status == true) ? 'success' : 'error';
          Swal.fire({
            icon: icon,
            title: icon,
            text: res.message,
          })
        },
        (err: any) => {
          this.loading = false;
        }
      );
    }
  }

  Update(element: any) {
    const dialogRef = this.dialog.open(CreateUpdateMealComponent, {
      width: '50%'
    });
    dialogRef.componentInstance.meal = element;
    dialogRef.componentInstance.action = 'Edit';
    dialogRef.componentInstance.status.subscribe(res => {
      if (res) {
        dialogRef.close();
        this.getData();
      }
    });
  }

  Add() {
    const dialogRef = this.dialog.open(CreateUpdateMealComponent, {
      width: '50%'
    });
    dialogRef.componentInstance.action = 'Create';
    dialogRef.componentInstance.status.subscribe(res => {
      if (res) {
        dialogRef.close();
        this.getData();
      }
    });
  }

  Delete(element: any) {
    //    element.item_id = element.itemId;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value == true) {
        this.adminService.delete(element, this.endpoint + '/deletefooditem').subscribe((res: any) => {
          if (res) {
            Swal.fire(
              'Deleted!',
              'Deleted Successfully.',
              'success'
            )
            this.getData();
          } else {
            Swal.fire(
              'Error!',
              'Delete not successful, please try again later.',
              'error'
            )
            this.getData();
          }
        });
      }
    })
  }

}

