import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  @ViewChild("editUserForm", { static: false }) public editUserForm: any
  editedUserModel: any = {};
  selectedId: any;

  constructor(private _authservice: AuthService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.selectedId = this.activatedRoute.snapshot.params["id"]
    console.log(this.selectedId)
  }
  ngOnInit(): void {
    this.getUserDetails();
  }
  getUserDetails() {
    this._authservice.getUserDetails(this.selectedId).subscribe((response: any) => {
      if (response.status == 200) {
        this.editedUserModel = response.data;
      } else {
        alert(response.data);
      }
    })
  }
  updateDetails() {
    if (!this.editUserForm.valid) {
      return
    } else {
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          this._authservice.updateDetails(this.editedUserModel).subscribe((response: any) => {
            if (response.status == 200) {
              this.router.navigate(["/userlist"]);
              Swal.fire({
              icon: 'success',
              title: 'User Details Saved',
              showConfirmButton: false
              })
            } else {
            }
          })
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
    }
  }
}
