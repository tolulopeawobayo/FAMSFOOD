import { Component, OnInit } from '@angular/core';
import { EndPoints } from 'src/app/shared/constant';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  loading: boolean = false;
  endpoint = EndPoints.DASHBOARD;
  Error: boolean = false;
  ErrorMessage: string = '';
  meals: any = [];
  dashboard: any = [];
  userinfo: any;

  constructor(private ds: SharedDataService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.userinfo = this.ds.getUser();
    console.log(this.userinfo);
    this.getData();
  }

  getData() {
    this.loading = true;
    this.adminService.getAll(this.endpoint + '/getdashboard?id=' + this.userinfo.user.id).subscribe(
      res => {
        if (res) {
          this.loading = false;
          this.dashboard = res.data;
          this.meals = res.data.listOfMeals;
          //  this.dataSource.paginator = this.paginator;
          //this.dataSource.sort = this.sort;
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
