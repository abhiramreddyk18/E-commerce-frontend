import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { CartService } from '../service/cart.service';
import { Product } from '../models/product';
import { Router } from '@angular/router';
import { LocalStorageService } from '../service/localstorage.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public productList: any = [];
  public Allproducts: any = [];
  loggedIn: boolean = false; // To track login status

  constructor(
    private apiservice: ApiService,
    private cartservice: CartService,
    private router: Router,
    private localstorageservice:LocalStorageService
  ) {}

  ngOnInit(): void {
   
    this.localstorageservice.isLoggedIn$.subscribe((status) => {
      this.loggedIn = status;
    });

  
    this.apiservice.getproduct().subscribe((res) => {
      this.Allproducts = res;

     
      this.Allproducts.forEach((element) => {
        Object.assign(element, { quantity: 1, total: element.price });
      });

      this.productList = this.Allproducts;
    });
  }

  addToCart(item: any): void {
    if (!this.loggedIn) {
      this.router.navigate(['/login']);
      return; 
    }

    
    const product = new Product(item.id, item.title, item.image, item.description, 1, item.price, item.price);
    this.cartservice.addtocart(product); 
  
}

category(category:string){

  this.productList=[];
  if(category=="All") this.productList=this.Allproducts;
  else{
    this.Allproducts.forEach(element=>{

      if(element.category[0]==category[0]){
        this.productList.push(element);
      }
    });

    console.log(this.productList);
  }
  
}

}










