import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import Swal from 'sweetalert2';
import { AdminService } from '../services/admin.service';
import { EndPoints } from 'src/app/shared/constant';
import { CreateUpdateAccountsComponent } from '../create-update-accounts/create-update-accounts.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  accounts: any = [
    {
      "id": 1, "firstName": "test", "lastName": "Tricia", "userId": 3094, "Totalgrams": 300, "subscriptionType": "Gold", "subName": "Rice"
    },
    {
      "id": 2, "firstName": "test", "lastName": "Tricia", "userId": 3094, "Totalgrams": 300, "subscriptionType": "Gold", "subName": "Rice"
    },
    {
      "id": 3, "firstName": "test", "lastName": "Tricia", "userId": 3094, "Totalgrams": 300, "subscriptionType": "Gold", "subName": "Rice"
    }
  ];
  loading: boolean = false;
  endpoint = EndPoints.ACCOUNT;
  Error: boolean = false;
  ErrorMessage: string = '';

  constructor(private ds: SharedDataService, private dialog: MatDialog, private adminService: AdminService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.adminService.getAll(this.endpoint + '/getallaccounts').subscribe(
      res => {
        if (res) {
          this.accounts = res.data;
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
    const dialogRef = this.dialog.open(CreateUpdateAccountsComponent, {
      width: '50%'
    });
    dialogRef.componentInstance.account = element;
    dialogRef.componentInstance.action = 'Edit';
    dialogRef.componentInstance.status.subscribe(res => {
      if (res) {
        dialogRef.close();
        this.getData();
      }
    });
  }

  Add() {
    const dialogRef = this.dialog.open(CreateUpdateAccountsComponent, {
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
        this.adminService.delete(element, this.endpoint + '/deleteaccount').subscribe((res: any) => {
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

