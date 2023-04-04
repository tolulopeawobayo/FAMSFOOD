import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AdminService } from '../services/admin.service';
import { EndPoints } from 'src/app/shared/constant';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any = [
    {
      "Id": 1, "firstName": "Tricia", "lastName": "test", "phoneNumber": "09024872831", "Email": "testttt",
      "State": "Abia", "LGA": "Umu", "Address": "Crescent 4 Abia State", "Gender": "Female", "Nationality": "Nigeria"
    },
    {
      "Id": 1, "firstName": "Tricia", "lastName": "test", "phoneNumber": "09024872831", "Email": "testttt",
      "State": "Abia", "LGA": "Umu", "Address": "Crescent 4 Abia State", "Gender": "Female", "Nationality": "Nigeria"
    },
    {
      "Id": 1, "firstName": "Cole", "lastName": "test", "phoneNumber": "09024872831", "Email": "testttt",
      "State": "Abia", "LGA": "Umu", "Address": "Crescent 4 Abia State", "Gender": "Male", "Nationality": "Nigeria"
    }
  ];
  loading: boolean = false;
  endpoint = EndPoints.USER;
  Error: boolean = false;
  ErrorMessage: string = '';

  constructor(private ds: SharedDataService, private dialog: MatDialog, private adminService: AdminService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.adminService.getAll(this.endpoint + '/getusers').subscribe(
      res => {
        if (res) {
          this.users = res.data;
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
        this.adminService.delete(element, this.endpoint + '/deleteuser').subscribe((res: any) => {
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

