import { Component, OnInit } from '@angular/core';
import { ApiService } from './service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit {
  title = 'cart';
  select=false;

  constructor(private apiservice:ApiService ){}

ngOnInit(): void {
 
  this.apiservice.checksession();
  
}
}