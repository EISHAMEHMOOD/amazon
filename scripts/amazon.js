//imports
import {products} from '../data/products.js';
import {cart,savetoStorage} from '../data/cart.js'

let productsHTML=' ';//a string for accumulator pattern
//loop through products array
products.forEach((product)=>{
 productsHTML +=`
 <div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src="${product.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="images/ratings/rating-${product.rating.stars * 10}.png">
      <div class="product-rating-count link-primary">
        ${product.rating.count}
      </div>
    </div>

    <div class="product-price">
      $${(product.priceCents /100).toFixed(2)}
    </div>

    <div class="product-quantity-container">
      <select class="js-select-tag-${product.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart js-added-${product.id}">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
      Add to Cart
    </button>
  </div>
 `;

});
//putting html into div
document.querySelector('.js-products-grid').innerHTML=productsHTML;

//Add to cart button
document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
  button.addEventListener('click',()=>{
    const productId=button.dataset.productId;

    //added text
    const addedText=document.querySelector(`.js-added-${button.dataset.productId}`);
    addedText.classList.add('added-to-cart-visible');
    setTimeout(()=>{
      addedText.classList.remove('added-to-cart-visible');
    },1000)

    //select tag
    const selectedElement=document.querySelector(`.js-select-tag-${button.dataset.productId}`);
    const selectedValue=Number(selectedElement.value);

    //code to check if item is already present in the cart
    let matchingItem;
    cart.forEach((item)=>{
      if(productId===item.productId){
        item.quantity+= selectedValue;
        matchingItem=item;
        savetoStorage();
      }

    });

    //if condition if item is alread
    if(!matchingItem){
      cart.push({
        productId:productId,
        quantity:selectedValue
      });
      savetoStorage();
    }
     
    //qunatity cout
    let totalQuantity=0;
    cart.forEach((item)=>{
      totalQuantity += item.quantity;
    })
    document.querySelector('.js-cart-quantity').innerHTML=totalQuantity;
     
   
  });
});

//search-bar
let matchingSearchItem;
document.querySelector('.js-search-button').addEventListener('click',()=>{
  let str=String(document.querySelector('.js-search-bar').value);
  let lowerCaseStr=str.toLowerCase();  
  products.forEach((product)=>{
    product.keywords.forEach((word)=>{
      if(lowerCaseStr===word){
        matchingSearchItem=product;
      }
    });
  });
  let searchstr=`
      <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${matchingSearchItem.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${matchingSearchItem.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${matchingSearchItem.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${matchingSearchItem.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(matchingSearchItem.priceCents /100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select class="js-select-tag-${matchingSearchItem.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-${matchingSearchItem.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${matchingSearchItem.id}">
        Add to Cart
      </button>
    </div>
  `;

  //putting html into div
  document.querySelector('.js-products-grid').innerHTML=searchstr;

});

