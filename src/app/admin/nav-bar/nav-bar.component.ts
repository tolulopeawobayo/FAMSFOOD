import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/shared/shared-data.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  menus: any = [
    { "menuName": "Home", "url": "/app/admin/home" },
    { "menuName": "Admin", "url": "/app/admin/admin-user" },
    { "menuName": "Users", "url": "/app/admin/user" },
    { "menuName": "Meal Items", "url": "/app/admin/meal" },
    { "menuName": "Food Items", "url": "/app/admin/food" },
    { "menuName": "Meal Schedules", "url": "/app/admin/meal-schedule" },
    { "menuName": "Subscription", "url": "/app/admin/subscription" },
    { "menuName": "Roles", "url": "/app/admin/role" },
    { "menuName": "Orders", "url": "/app/admin/orders" },
    { "menuName": "Accounts", "url": "/app/admin/account" }
  ];
  userinfo: any;

  constructor(private ds: SharedDataService) { }

  ngOnInit(): void {
    this.userinfo = this.ds.getUser();
  }

}
