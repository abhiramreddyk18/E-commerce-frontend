import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
// import { LocalStorageService } from './localstorage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,private router:Router) { 
   
  }
  // private localStorageService:LocalStorageService,
  
  apiurl = environment.apiUrl;

  getproduct() {
    return this.http.get<any>("https://fakestoreapi.com/products")
      .pipe(map((res: any) => {
        return res;
      }));
  }

  senduser(user: User) {
    return this.http.post(`${this.apiurl}/user/register`, user, { withCredentials: true });
  }

  login(user: { email: string, password: string }) {
    return this.http.post(`${this.apiurl}/user/login`, user).pipe(
      map((res: any) => {
        console.log('after login: ',res);
        if (res.success) {
          // this.localStorageService.setLoginStatus(true);
          return res;
        }
      })
    );
  }
  

  logout() {
    // this.localStorageService.setLoginStatus(false);
    return this.http.get(`${this.apiurl}/user/logout`);
  }



  checksession(){
    console.log("checking session");
    this.http.get(`${this.apiurl}/auth/session`, { withCredentials: true })
    .subscribe((response: any) => {
      if (response.loggedIn) {
        console.log('User is already logged in');
        this.router.navigate(['/home']);  // Redirect to home
      } else {
        console.log('Session expired, redirecting to login');
        this.router.navigate(['/login']); // Redirect to login
      }
    }, error => {
      console.log('Session check failed', error);
      this.router.navigate(['/login']); // Redirect to login on error
    });
  }
  }

 





