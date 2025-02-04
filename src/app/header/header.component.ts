import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { ApiService } from '../service/api.service';

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
  
  this.apiservice.isloggedIn$.subscribe(status=>{
    this.loggedin=status;
  })
}


logout(){
  this.apiservice.logout().subscribe(res=>{
    console.log(res);
  });
}



 
}
