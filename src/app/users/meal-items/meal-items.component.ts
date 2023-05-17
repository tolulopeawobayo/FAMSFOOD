import { Component, OnInit } from '@angular/core';
import { EndPoints } from 'src/app/shared/constant';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { SharedDataService } from 'src/app/shared/shared-data.service';

@Component({
  selector: 'app-meal-items',
  templateUrl: './meal-items.component.html',
  styleUrls: ['./meal-items.component.css']
})
export class MealItemsComponent implements OnInit {

  images: any = [
    "https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg", "https://tecdn.b-cdn.net/img/Photos/Slides/img%20(23).jpg",
    "https://tecdn.b-cdn.net/img/Photos/Slides/img%20(22).jpg", "https://tecdn.b-cdn.net/img/Photos/Slides/img%20(15).jpg"
  ]

  fooditems: any = [
    {
      "itemId": 1, "itemName": "Rice", "itemPrice": 2000, "oldPrice": 2500, "Description": "testttt", "Currency": "₦", "itemCategory": "Rice,",
      "Weight": 3094, "quantityAvailable": 23, "isAvailable": true, "imageUrl": "../../../assets/images/burger1.png"
    },
    {
      "itemId": 2, "itemName": "Chicken", "itemPrice": 1000, "oldPrice": 1200, "Description": "testttt", "Currency": "₦", "itemCategory": "Chicken,",
      "Weight": 3094, "quantityAvailable": 23, "isAvailable": true, "imageUrl": "../../../assets/images/burger.png"
    },
    {
      "itemId": 3, "itemName": "Pizza", "itemPrice": 3000, "oldPrice": 3400, "Description": "testttt", "Currency": "₦", "itemCategory": "Pizza,",
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

}
