import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EndPoints } from 'src/app/shared/constant';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { AdminService } from '../services/admin.service';
import { CreateUpdateSubscriptionComponent } from '../create-update-subscription/create-update-subscription.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  subscriptions: any = [
    {
      "id": 1, "subscriptionName": "test", "subDuration": 200, "totalWeight": 3094, "Price": 1123
    },
    {
      "id": 2, "subscriptionName": "test", "subDuration": 20, "totalWeight": 309, "Price": 2003
    },
    {
      "id": 3, "subscriptionName": "test", "subDuration": 50, "totalWeight": 94, "Price": 2300
    }
  ];
  loading: boolean = false;
  endpoint = EndPoints.SUBSCRIPTION;
  Error: boolean = false;
  ErrorMessage: string = '';

  constructor(private ds: SharedDataService, private dialog: MatDialog, private adminService: AdminService) { }

  ngOnInit(): void {
  }

  getData() {
    this.loading = true;
    this.adminService.getAll(this.endpoint + '/getallsubplans').subscribe(
      res => {
        if (res) {
          this.subscriptions = res.data;
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
    const dialogRef = this.dialog.open(CreateUpdateSubscriptionComponent, {
      width: '50%'
    });
    dialogRef.componentInstance.subscription = element;
    dialogRef.componentInstance.action = 'Edit';
    dialogRef.componentInstance.status.subscribe(res => {
      if (res) {
        dialogRef.close();
        this.getData();
      }
    });
  }

  Add() {
    const dialogRef = this.dialog.open(CreateUpdateSubscriptionComponent, {
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
        this.adminService.delete(element, this.endpoint + '/deletesubplan').subscribe((res: any) => {
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

