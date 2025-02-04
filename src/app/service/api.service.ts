import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  private loggedIn = new BehaviorSubject<boolean>(false);
  isloggedIn$ = this.loggedIn.asObservable();
  apiurl=environment.apiUrl;
  getproduct() {
    return this.http.get<any>("https://fakestoreapi.com/products")
      .pipe(map((res: any) => {
        return res;
      }))
  }

  senduser(user: User) {

    return this.http.post(`${this.apiurl}/user_register`, user, { withCredentials: true });

  }


  login(user: any) {
    this.verifylogin()
    return this.http.post(`${this.apiurl}/user_login`, user, { withCredentials: true });

   ;

  }


  logout() {
    this.verifylogout();
    return this.http.get(`${this.apiurl}/logout`);
  }


  verifylogin(){
    this.loggedIn.next(true);
  }


  verifylogout(){
    this.loggedIn.next(false);
  }




}
