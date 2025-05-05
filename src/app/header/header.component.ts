import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { ApiService } from '../service/api.service';
// import { LocalStorageService } from '../service/localstorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

len:number=0;
loggedin=false;
constructor(private cartservice:CartService,private apiservice:ApiService){}

ngOnInit(): void {
  
  this.cartservice.Totalitems$.subscribe(noof_items=>{
    this.len=noof_items;
  });

  this.apiservice.isLoggedIn$.subscribe(status => {
    this.loggedin = status;
  });

}

logout(){
  
  this.apiservice.logout().subscribe(res=>{
    console.log(res);
  });
}



 
}
