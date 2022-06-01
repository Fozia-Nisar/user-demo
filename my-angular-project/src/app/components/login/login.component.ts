import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild("loginForm", { static: false }) public loginForm: any
  authModel: any = {};
  constructor(private _authservice: AuthService, private router: Router) { }
  ngOnInit(): void {

  }

  login() {
    if (!this.loginForm.valid) {
      return
    } else {
      this._authservice.login(this.authModel).subscribe((response: any) => {
        if (response.status == 200) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Logged IN Successfully",
            showConfirmButton: false
          })
          this.router.navigate(["/userlist"])
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data,
          })
          this.authModel = {};
        }
      }, error => {
        console.log(error);
      })
    }
  }
}













