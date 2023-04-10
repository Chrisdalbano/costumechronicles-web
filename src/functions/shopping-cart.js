if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

function ready() {
  var cart = JSON.parse(localStorage.getItem('cart')); 
  displayCart(cart);
  updateCartTotal();
  updateCartCount();

  var removeCartItemButtons = document.querySelectorAll('.btn-danger')
  for ( var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener('click', removeCartItem);
  }

  var quantityInputs = document.querySelectorAll('.quantity-input')
  for ( var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener('change', quantityChange);
  }
}

function quantityChange(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  var buttonItem = buttonClicked.parentElement.parentElement;
  var merchandise = document.querySelectorAll('.merchandise');
  var cart = JSON.parse(localStorage.getItem('cart'));
  
  for ( var i = 0; i < merchandise.length; i++) {
    if(buttonItem == merchandise[i])
    {
      cart.splice(i, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }

  buttonItem.remove();
  updateCartTotal();
  updateCartCount();
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('merch-container')[0];
  var cartItems = cartItemContainer.getElementsByClassName('merchandise');
  var total = 0;
  
  for (var i = 0; i < cartItems.length; i++) {
    var cartItem = cartItems[i];
    var priceElement = cartItem.getElementsByClassName('product-price')[0];
    var quantityElement = cartItem.getElementsByClassName('quantity-input')[0];
    var price = parseFloat(priceElement.innerText.replace('$', ''));
    var quantity = quantityElement.value;
    total += price * quantity;
  }
  
  total = Math.round(total * 100) / 100;
  var cartTotal = document.querySelectorAll('.total');
  cartTotal[0].innerText = '$' + total;
  cartTotal[1].innerText = '$' + total;
}

function updateCartCount() {
  var cart = JSON.parse(localStorage.getItem('cart'));
  var count = document.getElementById('item_count');
  if(cart.length > 0) {
    count.innerText = cart.length;
    count.style.visibility = 'visible';
  }
}

function displayCart(cart) {
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

  var section = merchandise.getElementsByTagName('section')[0];
  section.appendChild(Object.assign(document.createElement('input'), 
      {className:'quantity-input', type:'number', value:1}))
  section.appendChild(Object.assign(document.createElement('button'), 
      {className:'btn btn-danger', innerText:'Remove'}))
  }
}
