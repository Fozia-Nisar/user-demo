import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild("registerForm",{ static:false}) public registerForm:any
  authModel: any = {};
  userModel: any = {};
  callingComponent: any;
  roles:String[]=["Admin", "User","super-Admin"]; 

  constructor(private _authservice: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.callingComponent = this.activatedRoute.snapshot.queryParamMap.get("callingComponent")
    console.log(this.callingComponent)
  }

  ngOnInit(): void {
  }

  registerUser(){
    if(!this.registerForm.valid){
      return
    }else{
    this._authservice.register(this.userModel).subscribe((response:any)=>{
      if(response.status == 200){
       Swal.fire({
        position: 'top-end',
         icon:'success',
         title:'User Added Successfully!',
         showConfirmButton: false
       })
       if(this.callingComponent=="addUser"){
         this.router.navigate(["/userlist"])
       }else{
         this.router.navigate(["/login"])
       }
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data,
          })
        this.userModel={};
       }
    })
  }
}
}









