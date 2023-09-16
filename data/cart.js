//import
import {products} from '../data/products.js';
export let cart=JSON.parse(localStorage.getItem('cart')) 
if(!cart){[]}

export function savetoStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function removeFromCart(productId){
  let newArray=[];
  cart.forEach((item)=>{
   if(productId !== item.productId){
    newArray.push(item);
   }
  });
  cart=newArray;
  savetoStorage();
}

export function TotalQuantity(){
  let totalQuantity=0;
  cart.forEach((item)=>{
    totalQuantity += item.quantity;
  });
  return totalQuantity;
}

export function TotalCost(){
  let totalCost=0;
  cart.forEach((item)=>{
    products.forEach((product)=>{
      let cost=0;
      if(item.productId===product.id){
        cost=product.priceCents * item.quantity;
        totalCost +=cost;
      }
    })
  });
  return totalCost;
}

export function tax(){
  let cost=TotalCost();
  let tax= (cost * 10) / 100;
  return tax;

}

export function total(){
  let total=TotalCost()+ tax();
  return total;
}