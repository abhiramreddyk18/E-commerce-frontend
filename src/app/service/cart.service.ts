import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }

  private  totalItems= new BehaviorSubject<number>(null);
    Totalitems$ = this.totalItems.asObservable();
  
  noof_items:number=0;
  apiurl=environment.apiUrl;

    addtocart(item:Product){
      
        this.http.post(`${this.apiurl}/add_to_cart`,item,{ withCredentials: true }).subscribe((cartData)=>{
          const cartArray = Object.values(cartData); 
          console.log("Converted Array:", cartArray);
          this.noof_items = cartArray.length;
          this.totalItems.next(this.noof_items);
        },(error)=>{
          console.log(error);
        });
      }


      getproducts(){
        return this.http.get(`${this.apiurl}/get_products`,{withCredentials:true});
      }
      
      
      removeFromCart(item:Product){
        return this.http.post(`${this.apiurl}/remove_from_cart`,item,{withCredentials:true}).subscribe(res=>{
          console.log(res);
        })
    }

   

     
}
