import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor() {
    this.checkInitialLoginStatus();  
    this.listenToLocalStorageChanges(); 
  }

  private checkInitialLoginStatus() {
        console.log("in serve of storage");
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.loggedIn.next(isLoggedIn); 
  }

  private listenToLocalStorageChanges() {
   console.log("local is changed");
    window.addEventListener('storage', (event) => {
      if (event.key === 'isLoggedIn') {
        this.checkInitialLoginStatus(); 
      }
    });
  }

  setLoginStatus(status: boolean) {
   
    localStorage.setItem('isLoggedIn', status ? 'true' : 'false');
    this.loggedIn.next(status);
  }
}
