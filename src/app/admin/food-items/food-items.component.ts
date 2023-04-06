import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { CreateUpdateFoodItemsComponent } from '../create-update-food-items/create-update-food-items.component';
import { AdminService } from '../services/admin.service';
import { EndPoints } from 'src/app/shared/constant';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-food-items',
  templateUrl: './food-items.component.html',
  styleUrls: ['./food-items.component.css']
})
export class FoodItemsComponent implements OnInit {

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
  loading: boolean = false;
  endpoint = EndPoints.FOODITEM;
  Error: boolean = false;
  ErrorMessage: string = '';

  constructor(private ds: SharedDataService, private dialog: MatDialog, private adminService: AdminService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.adminService.getAll(this.endpoint + '/getallfooditems').subscribe(
      res => {
        if (res) {
          this.fooditems = res.data;
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
    const dialogRef = this.dialog.open(CreateUpdateFoodItemsComponent, {
      width: '50%'
    });
    dialogRef.componentInstance.fooditem = element;
    dialogRef.componentInstance.action = 'Edit';
    dialogRef.componentInstance.status.subscribe(res => {
      if (res) {
        dialogRef.close();
        this.getData();
      }
    });
  }

  Add() {
    const dialogRef = this.dialog.open(CreateUpdateFoodItemsComponent, {
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
