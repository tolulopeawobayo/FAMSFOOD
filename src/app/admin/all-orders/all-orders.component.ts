import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EndPoints } from 'src/app/shared/constant';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import Swal from 'sweetalert2';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {

  orders: any = [
    {
      "Id": 1, "mealId": 1, "mealName": "test", "mealPrice": 2000, "Description": "testttt", "Address": "2, Kofo Street",
      "quantityOrdered": 23, "isAvailable": true, "imageUrl": "https:deco.co"
    },
    {
      "Id": 2, "mealId": 2, "mealName": "test", "mealPrice": 2000, "Description": "testttt", "Address": "2, Kofo Street",
      "quantityOrdered": 23, "isAvailable": false, "imageUrl": "https:deco.co"
    },
    {
      "Id": 3, "mealId": 3, "mealName": "test", "mealPrice": 2000, "Description": "testttt", "Address": "2, Kofo Street",
      "quantityOrdered": 23, "isAvailable": true, "imageUrl": "https:deco.co"
    }
  ];
  loading: boolean = false;
  endpoint = EndPoints.ORDER;
  Error: boolean = false;
  ErrorMessage: string = '';

  constructor(private ds: SharedDataService, private dialog: MatDialog, private adminService: AdminService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.adminService.getAll(this.endpoint + '/getallorders').subscribe(
      res => {
        if (res) {
          this.orders = res.data;
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

  // Update(element: any) {
  //   const dialogRef = this.dialog.open(CreateUpdateMealComponent, {
  //     width: '50%'
  //   });
  //   dialogRef.componentInstance.meal = element;
  //   dialogRef.componentInstance.action = 'Edit';
  //   dialogRef.componentInstance.status.subscribe(res => {
  //     if (res) {
  //       dialogRef.close();
  //       this.getData();
  //     }
  //   });
  // }

  // Add() {
  //   const dialogRef = this.dialog.open(CreateUpdateMealComponent, {
  //     width: '50%'
  //   });
  //   dialogRef.componentInstance.action = 'Create';
  //   dialogRef.componentInstance.status.subscribe(res => {
  //     if (res) {
  //       dialogRef.close();
  //       this.getData();
  //     }
  //   });
  // }

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
        this.adminService.delete(element, this.endpoint + '/deleteorder').subscribe((res: any) => {
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

