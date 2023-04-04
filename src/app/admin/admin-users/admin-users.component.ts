import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EndPoints } from 'src/app/shared/constant';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { AdminService } from '../services/admin.service';
import { CreateUpdateUsersComponent } from '../create-update-users/create-update-users.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  admins: any = [
    {
      "Id": 1, "firstName": "Tricia", "lastName": "test", "phoneNumber": "09024872831", "Email": "testttt",
      "Role": "Admin", "Gender": "Female", "Nationality": "Nigeria"
    },
    {
      "Id": 1, "firstName": "Tricia", "lastName": "test", "phoneNumber": "09024872831", "Email": "testttt",
      "Role": "Admin", "Gender": "Female", "Nationality": "Nigeria"
    },
    {
      "Id": 1, "firstName": "Cole", "lastName": "test", "phoneNumber": "09024872831", "Email": "testttt",
      "Role": "Admin", "Gender": "Male", "Nationality": "Nigeria"
    }
  ];
  loading: boolean = false;
  endpoint = EndPoints.ADMIN;
  Error: boolean = false;
  ErrorMessage: string = '';

  constructor(private ds: SharedDataService, private dialog: MatDialog, private adminService: AdminService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.adminService.getAll(this.endpoint + '/getalladmins').subscribe(
      res => {
        if (res) {
          this.admins = res.data;
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
    const dialogRef = this.dialog.open(CreateUpdateUsersComponent, {
      width: '50%'
    });
    dialogRef.componentInstance.admin = element;
    dialogRef.componentInstance.action = 'Edit';
    dialogRef.componentInstance.status.subscribe(res => {
      if (res) {
        dialogRef.close();
        this.getData();
      }
    });
  }

  Add() {
    const dialogRef = this.dialog.open(CreateUpdateUsersComponent, {
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
        this.adminService.delete(element, this.endpoint + '/deleteadmin').subscribe((res: any) => {
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

