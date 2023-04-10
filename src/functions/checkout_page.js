if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

function ready() {
  displayCart();
  updateCartTotal();
  updateCartCount();
}

function updateCartTotal() {
  var cart = JSON.parse(localStorage.getItem('cart'));
  var subTotal = 0;
  var tax = 0;
  var total = 0;
  
  for (var i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].quantity;
  }
  
  subTotal = Math.round(total * 100) / 100;
  var cartSubTotal = document.querySelector('.subTotal');
  cartSubTotal.innerText = '$' + subTotal;

  tax = (total * 0.06).toFixed(2);
  var cartTax = document.querySelector('.tax');
  cartTax.innerText = '$' + tax;

  total = Math.round((total - tax) * 100) / 100;
  var cartTotal = document.querySelector('.total');
  cartTotal.innerText = '$' + total; 
}

function updateCartTotal() {
  var cart = JSON.parse(localStorage.getItem('cart'));
  var subTotal = 0;
  var tax = 0;
  var total = 0;
  
  for (var i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].quantity;
  }
  
  subTotal = Math.round(total * 100) / 100;
  var cartSubTotal = document.querySelector('.subTotal');
  cartSubTotal.innerText = '$' + subTotal;

  tax = (total * 0.06);
  var cartTax = document.querySelector('.tax');
  cartTax.innerText = '$' + tax.toFixed(2);

  total = Math.round((total + tax) * 100) / 100;
  var cartTotal = document.querySelector('.total');
  cartTotal.innerText = '$' + total; 
}

function displayCart() {
  var cart = JSON.parse(localStorage.getItem('cart'));
  for ( var i = 0 ; i < cart.length; i++ ) {
    var item = cart[i];

    var container = document.getElementsByClassName('merch-container')[0];
    container.appendChild(Object.assign(document.createElement('div'), 
      {className:'merchandise'}))

    var merchandise = document.getElementsByClassName('merchandise')[i];
    merchandise.appendChild(Object.assign(document.createElement('img'), 
      {className:'product-image', src:item.image}))
    merchandise.appendChild(Object.assign(document.createElement('div'), 
      {className:'product-info'}))
    merchandise.appendChild(Object.assign(document.createElement('section')))

    var productInfo = document.getElementsByClassName('product-info')[i];
    productInfo.appendChild(Object.assign(document.createElement('h3'), 
      {className:'product-name', innerText:item.product_name}))
    productInfo.appendChild(Object.assign(document.createElement('p'), 
      {className:'product-size', innerText:item.size}))
    productInfo.appendChild(Object.assign(document.createElement('p'), 
      {className:'product-price', innerText:item.price}))
    productInfo.appendChild(Object.assign(document.createElement('b'), 
      {className:'product-quantity', innerText:item.quantity}))
  }
}
