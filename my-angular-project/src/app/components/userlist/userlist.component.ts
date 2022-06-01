import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {
  userModel: any = {};
  userDb: any = [];
  authModel: any = {};
  data: any;

  constructor(private _authservice: AuthService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this._authservice.getUsers().subscribe((response: any) => {
      this.userDb = [];
      if (response.status == 200) {
        this.userDb = response.data
      } else {
        this.data = response.data
      }
    })
  }

  editUser(id: any) {
    //this.router.navigate(["/edituser/" + id]);
    this.router.navigate([`/edituser/${id}`]);
  }

  deleteUser(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._authservice.deleteUser(id).subscribe((response: any) => {
          if (response.status == 200) {
            this.getUsers();
            }else{
    
          }
        })
        
      }
    })
  }
  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to LOG OUT!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes,LOG ME OUT!'
    }).then((result) => {
      if (result.isConfirmed) {
    this.userModel = {};
    this.authModel = {};
    this.router.navigate(["/login"])
  }
})
  }
  
  addUser() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        callingComponent: "addUser"
      }
    }
    this.router.navigate(["/register"], navigationExtras)
  }
}
