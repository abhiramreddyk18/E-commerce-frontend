import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  providers: [DecimalPipe]
})
export class CartComponent implements OnInit{
  public products:any=[];
  totalPrice:any;

constructor(private cartservice:CartService,private router:Router){}


ngOnInit(){

  this.updateAllProducts();
}

DecreaseItem(index:number){
  const product = this.products[index];

  if (product.quantity > 1) {
    this.cartservice.removeFromCart(this.products[index]);
    product.quantity--;
  } else {
    this.cartservice.removeFromCart(this.products[index]);
    this.products.splice(index, 1);
  }
 
  this.products = [...this.products];
  
  this.calculateTotalPrice();
}


IncreaseItem(index:number){

  const product = this.products[index];
  
  product.quantity++;


    
  this.cartservice.addtocart(this.products[index]);
  this.products = [...this.products];

  this.calculateTotalPrice();
}


ShopMore(){
  this.router.navigate(['products']);
}



updateAllProducts(){

this.cartservice.getproducts().subscribe(res=>{

    this.products=res;

    this.calculateTotalPrice();

  },error=>{

    console.log(error);

  })

}


private calculateTotalPrice(): void {
  this.totalPrice = this.products.reduce(
    (sum, product) => sum + product.price * (product.quantity || 1),0);
}

 
 


}




