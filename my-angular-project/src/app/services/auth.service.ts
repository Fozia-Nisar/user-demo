import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }
  serverUrl = environment.serverUrl;

  login(authModel: any) {
    return this.http.post(`${this.serverUrl}login`, authModel)
  }
  register(userModel: any) {
    return this.http.post(`${this.serverUrl}register`, userModel)
  }
  getUsers() {
    return this.http.get(`${this.serverUrl}getUsers`)
  }
  deleteUser(id: any) {
    return this.http.delete(`${this.serverUrl}deleteUser/${id}`)
  }
  getUserDetails(id: any) {
    return this.http.get(`${this.serverUrl}getUserDetails/${id}`)
  }
  updateDetails(editedUserModel: any) {
    return this.http.put(`${this.serverUrl}update/${editedUserModel._id}`, editedUserModel)
  }
}


