import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderModalComponent } from '../order-modal/order-modal.component';
import { EndPoints } from 'src/app/shared/constant';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.css']
})
export class MealDetailsComponent implements OnInit {

  fooditems: any = [
    {
      "itemId": 1, "itemName": "Rice", "itemPrice": 2000, "oldPrice": 2500, "Description": "testttt", "Currency": "$", "itemCategory": "Rice,",
      "Weight": 3094, "quantityAvailable": 23, "isAvailable": true, "imageUrl": "../../../assets/images/burger1.png"
    },
    {
      "itemId": 2, "itemName": "Chicken", "itemPrice": 1000, "oldPrice": 1200, "Description": "testttt", "Currency": "$", "itemCategory": "Chicken,",
      "Weight": 3094, "quantityAvailable": 23, "isAvailable": true, "imageUrl": "../../../assets/images/burger.png"
    },
    {
      "itemId": 3, "itemName": "Pizza", "itemPrice": 3000, "oldPrice": 3400, "Description": "testttt", "Currency": "$", "itemCategory": "Pizza,",
      "Weight": 3094, "quantityAvailable": 23, "isAvailable": true, "imageUrl": "../../../assets/images/burger1.png"
    }
  ];
  loading: boolean = false;
  endpoint = EndPoints.FOODITEM;
  Error: boolean = false;
  ErrorMessage: string = '';

  constructor(private ds: SharedDataService, private dialog: MatDialog, private userService: UserService) { }

  ngOnInit(): void {
    //this.getData(); 
  }

  setData(e: any) {
    console.log(e);
    const element: any = document.getElementById(e.target.id);
    element.dataset.teTarget = `my-target-${e.target.id}`;
  }

  getData() {
    this.loading = true;
    this.userService.getAll(this.endpoint + '/getfooditems').subscribe(
      res => {
        if (res) {
          this.fooditems = res.data;
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

  Add() {
    const dialogRef = this.dialog.open(OrderModalComponent, {
      width: '50%'
    });
    // dialogRef.componentInstance.action = 'Create';
    dialogRef.componentInstance.status.subscribe(res => {
      if (res) {
        dialogRef.close();
      }
    });
  }

}
