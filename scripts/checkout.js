//imports
import {products} from '../data/products.js';
import {cart,removeFromCart,TotalQuantity,TotalCost,tax,total} from '../data/cart.js'

let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${(matchingProduct.priceCents /100).toFixed(2)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="${matchingProduct.id}" value="0">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="${matchingProduct.id}" value="499">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="${matchingProduct.id}" value="999">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});
//putting html into page
document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
document.querySelector('.js-item-quantity').innerHTML =`${TotalQuantity()} items`;

//delete button
document.querySelectorAll('.js-delete-link').forEach((deleteButton)=>{
 deleteButton.addEventListener('click',()=>{
   const productId=deleteButton.dataset.productId;
   removeFromCart(productId);
   const cartItem=document.querySelector(`.js-cart-item-container-${productId}`);
   cartItem.remove();
   document.querySelector('.js-item-quantity').innerHTML =`${TotalQuantity()} items`;
   document.querySelector('.js-order-item').innerHTML =`item(${TotalQuantity()}):`;
   document.querySelector('.js-total-price').innerHTML =`$${(TotalCost()/100).toFixed(2)}`;
 });
});

//order button
document.querySelector('.js-order-button').addEventListener('click',()=>{
  const orderText=document.querySelector(`.js-order`);
  orderText.classList.add('order-visible');
 
});


//calculate order
document.querySelector('.js-calculate-bill').addEventListener('click',()=>{
  document.querySelector('.js-order-item').innerHTML =`item(${TotalQuantity()}):`;
  document.querySelector('.js-total-price').innerHTML =`$${(TotalCost()/100).toFixed(2)}`;
  document.querySelector('.js-before-tax').innerHTML =`$${(TotalCost()/100).toFixed(2)}`;
  document.querySelector('.js-estimated-tax').innerHTML =`$${(tax()/100).toFixed(2)}`;
  document.querySelector('.js-order-total').innerHTML =`$${(total()/100).toFixed(2)}`;
});


