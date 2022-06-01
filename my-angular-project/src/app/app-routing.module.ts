import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserlistComponent } from './components/userlist/userlist.component';
const routes: Routes = [ 
  { path:"login", component:LoginComponent} ,
  { path:"register", component:RegisterComponent},
  {path:"userlist",component:UserlistComponent},
  {path:"edituser/:id",component:EditUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
