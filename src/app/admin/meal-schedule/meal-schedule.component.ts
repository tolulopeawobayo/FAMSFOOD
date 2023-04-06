import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CreateUpdateMealScheduleComponent } from '../create-update-meal-schedule/create-update-meal-schedule.component';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { EndPoints } from 'src/app/shared/constant';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-meal-schedule',
  templateUrl: './meal-schedule.component.html',
  styleUrls: ['./meal-schedule.component.css']
})
export class MealScheduleComponent implements OnInit {

  schedules: any = [
    {
      "id": 1, "firstName": "test", "lastName": "Tricia", "userId": 3094, "day": "Tuesday", "byUser": true, "Meals": "Rice, Beans, Plantain"
    },
    {
      "id": 2, "firstName": "test", "lastName": "Tricia", "userId": 3094, "day": "Tuesday", "byUser": true, "Meals": "Rice, Beans, Plantain"
    },
    {
      "id": 3, "firstName": "test", "lastName": "Tricia", "userId": 3094, "day": "Tuesday", "byUser": true, "Meals": "Rice, Beans, Plantain"
    }
  ];
  loading: boolean = false;
  endpoint = EndPoints.SCHEDULE;
  Error: boolean = false;
  ErrorMessage: string = '';

  constructor(private ds: SharedDataService, private dialog: MatDialog, private adminService: AdminService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.adminService.getAll(this.endpoint + '/getallschedules').subscribe(
      res => {
        if (res) {
          this.schedules = res.data;
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

  Update(element: any) {
    const dialogRef = this.dialog.open(CreateUpdateMealScheduleComponent, {
      width: '50%'
    });
    dialogRef.componentInstance.schedule = element;
    dialogRef.componentInstance.action = 'Edit';
    dialogRef.componentInstance.status.subscribe(res => {
      if (res) {
        dialogRef.close();
        this.getData();
      }
    });
  }

  Add() {
    const dialogRef = this.dialog.open(CreateUpdateMealScheduleComponent, {
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
        this.adminService.delete(element, this.endpoint + '/deleteschedule').subscribe((res: any) => {
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

